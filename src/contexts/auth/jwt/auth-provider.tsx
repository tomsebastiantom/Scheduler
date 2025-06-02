import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// import { authApi } from "src/api/auth";
import type { User } from "src/types/user";
import { Issuer } from "src/utils/auth";

import type { State } from "./auth-context";
import { AuthContext, initialState } from "./auth-context";
import { login, logout } from "src/api/auth.api";
import { mockLogin, mockLogout } from "src/api/data/test.api";
const STORAGE_KEY = "accessToken";
const STORAGE_KEY_REFRESH = "refreshToken";
enum ActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: User;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: User;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      let accessToken = window.sessionStorage.getItem(STORAGE_KEY);

      // Auto-login for portfolio demo - if no token exists, create a demo session
      if (!accessToken) {
        try {
          const demoResponse = await mockLogin({
            username: "portfolio-visitor",
            password: "demo",
          });
          accessToken = demoResponse.accessToken;
          window.sessionStorage.setItem(STORAGE_KEY, accessToken);
          window.sessionStorage.setItem(
            STORAGE_KEY_REFRESH,
            demoResponse.refreshToken
          );
        } catch (err) {
          console.log("Auto-login failed, proceeding as guest");
        }
      }

      if (accessToken) {
        const user = {
          username: "Portfolio Visitor",
          password: "demo",
          id: "demo-user",
          name: "Portfolio Visitor",
          email: "visitor@portfolio.com",
          phone: "000-000-0000",
          role: "visitor",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (username: string, password: string): Promise<void> => {
      const response = await mockLogin({ username, password });
      const { accessToken, refreshToken } = response;

      const user = {
        username: username,
        password: password,
        id: "user-" + Date.now(),
        name: username,
        email: username + "@example.com",
        phone: "000-000-0000",
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY, accessToken);
      sessionStorage.setItem(STORAGE_KEY_REFRESH, refreshToken);
      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email: string, name: string, password: string): Promise<void> => {
      // const { accessToken } = await authApi.signUp({ email, name, password });
      // const user = await authApi.me({ accessToken });

      // sessionStorage.setItem(STORAGE_KEY, accessToken);
      const user: User = {
        id: "dd",
        username: "email",
        password: "password",
        name: "name",
        email: "email",
        phone: "phone",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      };
      dispatch({
        type: ActionType.SIGN_UP,
        payload: {
          user: user,
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await mockLogout();
    } catch (e) {
      console.log("error", e);
    }

    sessionStorage.clear();
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
