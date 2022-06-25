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

// ==== TYPES ====
