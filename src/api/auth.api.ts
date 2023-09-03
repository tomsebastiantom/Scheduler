import api from './api';
import { ApiRequestConfig } from './api.types';

const URLs={
  loginUrl:'/users/login',
  registerUrl:'/tenant',
  addUserUrl:"/users",
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

export const login = (
  { username, password }: LoginPayload,
  config?: ApiRequestConfig
) => {
  return api.post<LoginResponse>(URLs.loginUrl, { username, password }, config);
};

export const logout = (config?: ApiRequestConfig) => {
  return api.post<LoginResponse>(URLs.logoutUrl,config);
};




