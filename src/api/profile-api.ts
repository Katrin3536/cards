import axios, {AxiosResponse} from 'axios';
import {LoginResponseType} from './authorization-api';

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});

export const profileAPI = {
    setName(name: string) {
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, UpdateProfilePayloadType>(`auth/me`, {name});
    },

    setAvatar(avatar: string) {
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, UpdateProfilePayloadType>(`auth/me`, {avatar});
    },
};

// ==== TYPES ====

export type UpdateProfileResponseType = {
    updatedUser: LoginResponseType,
    token: string,
    tokenDeathTime: number
}

export type UpdateProfilePayloadType = {
    name?: string,
    avatar?: string
}
