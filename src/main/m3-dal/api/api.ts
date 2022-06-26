import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

// ==== AUTHORIZATION ====

export const authAPI = {
  logout() {
    return instance.delete(`auth/me`).then((response) => response.data);
  },
};

// ==== REGISTRATION ====

export const registrationAPI = {};

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
    return instance.post(`auth/forgot`, data);
  },
};

// ==== TYPES ====
