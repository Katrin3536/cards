import { AxiosResponse } from "axios";
import { instance } from "./api-instance";

export const authAPI = {
  authMe() {
    return instance.post<
      any,
      AxiosResponse<LoginResponseType>,
      LoginPayloadType
    >(`auth/me`);
  },

  login(data: LoginPayloadType) {
    return instance.post<
      any,
      AxiosResponse<LoginResponseType>,
      LoginPayloadType
    >("auth/login", data);
  },

  logout() {
    return instance.delete<LogoutResponseType>(`auth/me`);
  },
};

// ==== TYPES ====

export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResponseType = {
  created: string;
  email: string;
  isAdmin: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  rememberMe: boolean;
  token: string;
  tokenDeathTime: number;
  updated: string;
  verified: boolean;
  __v: number;
  _id: string;
};

export type LogoutResponseType = {
  info: string;
};
