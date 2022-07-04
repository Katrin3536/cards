import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    authMe() {
        return instance.post<any, AxiosResponse<LoginResponseType>, LoginPayloadType>(
            `auth/me`
        );
    },
    login(data: LoginPayloadType) {
        return instance.post<any, AxiosResponse<LoginResponseType>, LoginPayloadType>(
            'auth/login',
            data
        );
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
    info: string
};
