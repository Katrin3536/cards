import axios, {AxiosError} from 'axios';
import {authAPI} from '../../api/authorization-api';
import {AppRootStateType, AppThunk} from '../store';
import {loginAC, LoginType} from './auth-reducer';
import {setProfileInfoAC} from './profile-reducer';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitializeApp: false,
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/initialized':
            return {...state, isInitializeApp: action.value,};

        case 'APP/app-status':
            return {...state, status: action.status,};

        case 'APP/app-error':
            return {...state, error: action.error,};

        default:
            return state;
    }
};

// ==== ACTIONS =====

export const initializeAppAC = (value: boolean) => ({type: 'APP/initialized', value} as const);

export const appSetStatusAC = (status: RequestStatusType) => ({type: 'APP/app-status', status} as const);

export const appSetErrorAC = (error: null | string) => ({type: 'APP/app-error', error} as const);

// ==== THUNKS =====

export const initializeAppTC = (): AppThunk => async dispatch => {
    try {
        dispatch(appSetStatusAC('loading'));
        const response = await authAPI.authMe();
        dispatch(loginAC(true));
        dispatch(setProfileInfoAC(response.data));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message;
            console.log(error)
        } else {
            dispatch(appSetErrorAC(err.message));
        }
    } finally {
        dispatch(appSetStatusAC('idle'));
        dispatch(initializeAppAC(true));
    }
};

// ==== SELECTORS ====

export const appErrorSelect = (state: AppRootStateType) => state.app.error;
export const appStatusSelect = (state: AppRootStateType) => state.app.status;
export const initializeAppSelect = (state: AppRootStateType) => state.app.isInitializeApp;

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitializeAppType = ReturnType<typeof initializeAppAC>;
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>;
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>;

export type AppActionsTypes =
    | InitializeAppType
    | AppSetStatusType
    | AppSetErrorType
    | LoginType;
