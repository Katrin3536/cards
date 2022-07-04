import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {AppActionsTypes, appSetErrorAC} from '../bll/reducers/app-reducer';

export const handleNetworkError = (dispatch: Dispatch<AppActionsTypes>, err: Error | AxiosError<{ error: string }>) => {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;
        dispatch(appSetErrorAC(error));
    } else {
        dispatch(appSetErrorAC(err.message));
    }
};