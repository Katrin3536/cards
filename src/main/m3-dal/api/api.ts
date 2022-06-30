import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/" || "http://localhost:7542/2.0/",
  // baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

// ==== AUTHORIZATION ====

export const authAPI = {
  authMe() {
    return instance.post<LoginParamsType, AxiosResponse<LoginResponseType>>(
      `auth/me`
    );
  },

  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<LoginResponseType>>(
      "auth/login",
      data
    );
  },

  logout() {
    return instance.delete<LoguotResponseType>(`auth/me`);
  },
};

// ==== PROFILE ====

export const profileAPI = {
  setName(name: string) {
    return instance.put(`auth/me`, { name });
  },

  setAvatar(avatar: string) {
    return instance.put(`auth/me`, { avatar });
  },
};

// ==== REGISTRATION ====

export const registrationAPI = {
  createUser(email: string, password: string) {
    return instance.post(`auth/register`, { email, password });
  },
};

// ==== FORGOT PASSWORD ====
export const forgotPassAPI = {
  forgot(email: string) {
    const data = {
      email: email,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                link</a>
                </div>`,
    };
    return axios.post(`https://neko-back.herokuapp.com/2.0/auth/forgot`, data); // request to heroku
    // return instance.post(`auth/forgot`, data);
  },

  createNewPassword(password: string, resetPasswordToken: string | undefined) {
    return instance.post(`auth/set-new-password`, {
      password,
      resetPasswordToken,
    });
  },
};

// ==== TYPES ====

export type LoginParamsType = {
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

export type LoguotResponseType = { info: string };
