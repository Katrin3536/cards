import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const forgotPassAPI = {
    forgot(email: string) {
        const data: ForgotPassPayloadType = {
            email: email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                link
                </a>
            </div>`,
        };
        return axios.post<any, AxiosResponse<ForgotPassResponseType>, ForgotPassPayloadType>(`https://neko-back.herokuapp.com/2.0/auth/forgot`, data); // request to heroku
        // return instance.post(`auth/forgot`, data);
    },

    createNewPassword(password: string, resetPasswordToken: string | undefined) {
        return instance.post<any, AxiosResponse<ForgotPassResponseType>, UpdatePassPayloadType>(`auth/set-new-password`, {
            password,
            resetPasswordToken
        });
    },
};

// ==== TYPES ====

export type ForgotPassResponseType = {
    info: string,
    success: boolean,
};

export type ForgotPassPayloadType = {
    email: string
    from: string
    message: string
}
export type UpdatePassPayloadType = {
    password: string
    resetPasswordToken: string | undefined
}