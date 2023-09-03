import axios from "axios";
import {
  AxiosInstance,
  AxiosPromise,
  Cancel,
  AxiosRequestHeaders,
} from "axios";
import { Toast, toast } from "react-hot-toast";
import {
  ApiRequestConfig,
  WithAbortFn,
  ApiExecutor,
  ApiExecutorArgs,
  ApiError,
  myConfig,
} from "./api.types";

const axiosParams = {
  baseURL: "http://localhost:5000/v1",
  // baseURL: `${import.meta.env.VITE_APP_API_URL}`,
};

const axiosInstance = axios.create(axiosParams);
const refreshToken = async () => {
  try {
    const refreshResponse = await axiosInstance.post("/users/token/refresh", {
      refreshToken: sessionStorage.getItem("refreshToken"),
    });

    const { accessToken, refreshToken } = refreshResponse.data;

    // Update the access token in sessionStorage or any other storage mechanism
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    (axiosInstance.defaults.headers as unknown as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    // Handle token refresh error
    console.log("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token");
  }
};

// Add interceptors for request and response

const emptyHeaders: AxiosRequestHeaders = {} as any;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");

    config.headers = config.headers ? config.headers : emptyHeaders;

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // handle your response
    return response;
  },
  async (error) => {
    // example: refresh the token if response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      try {
        // Refresh the access token
        const newAccessToken = await refreshToken();

        // Retry the original request with the updated access token
        error.config.headers["Authorization"] = newAccessToken;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        console.log("Error refreshing access token:", refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

const didAbort = (error: unknown): error is Cancel & { aborted: boolean } =>
  axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error);
};

const withAbort = <T>(fn: WithAbortFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig;
    // Extract abort property from the config
    const { abort, ...config } = originalConfig;

    // Create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn<T>(url, body, config);
      } else {
        const [url] = args;
        return await fn<T>(url, config);
      }
    } catch (error) {
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

const withLogger = async <T>(promise: AxiosPromise<T>) =>
  promise.catch((error: ApiError) => {
    /*
    Always log errors in dev environment
    if (process.env.NODE_ENV !== 'development') throw error      
  */
    // Log error only if VUE_APP_DEBUG_API env is set to true
    // if (!process.env.REACT_APP_DEBUG_API) throw error;
    if (error.response) {
      // that falls out of the range of 2xx

      if (
        typeof error.response.data === "object" &&
        error.response.data !== null
      ) {
        if ("message" in error.response.data) {
          toast.error((error.response.data as any).message);
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);

    throw error;
  });

// Main api function
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.get)(url, config)),
    delete: <T>(url: string, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.delete)(url, config)),
    post: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.post)(url, body, config)),
    patch: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.patch)(url, body, config)),
    put: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.put)(url, body, config)),
  };
};
export default api(axiosInstance);
