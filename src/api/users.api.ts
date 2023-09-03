import { User,UpdatedUser,NewUser } from 'src/types/user';
import api from './api';
import { ApiRequestConfig } from './api.types';

const URLs={
  loginUrl:'/users/login',
  registerUrl:'/tenant',
  userUrl:"/users",
  refreshTokenUrl:"/users/token/refresh",
  logoutUrl:"/users/logout",
  forgotPasswordUrl:"/forgotPassword"
 }

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};


export const getAllUsers = (
  config?: ApiRequestConfig
) => {
  return api.get<User[]>(URLs.userUrl, config);
};
export const getUser = (config?: ApiRequestConfig) => {
  return api.get<User>(`${URLs.userUrl}/me`,config);
}

export const createUser = (user:NewUser,config?: ApiRequestConfig) => {
  // console.log("crUser",user);
  return api.post<NewUser>(`${URLs.userUrl}`,user,config);
}
export const updateUser = (user:UpdatedUser,config?: ApiRequestConfig) => {
  return api.put<User>(`${URLs.userUrl}/`,user,config);
}
export const deleteUser = (userId:string,config?: ApiRequestConfig) => {
  return api.delete<User>(`${URLs.userUrl}/${userId}`,config);
}
export const register = (
  { email, password }: any,
  config: ApiRequestConfig
) => {
  return api.post<any>(URLs.userUrl, { email, password }, config);
};

