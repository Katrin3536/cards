import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const getCardsAPI = {
    getCardsList() {
        return instance.get<any, AxiosResponse<any>, any>(`cards/pack`, /*{
            email,
            password
        }*/);
    },
};

// ==== TYPES ====

export type RegistrationPayloadType = {
    email: string;
    password: string;
};

type RegistrationResponseType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    __v: number,
}


