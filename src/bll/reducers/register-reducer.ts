import {AppRootStateType, AppThunk} from '../store';
import {appSetStatusAC} from './app-reducer';
import {registrationAPI} from '../../api/registration-api';
import {AxiosError} from 'axios';
import {handleNetworkError} from '../../utils/errorUtils';

const initialState = {
    email: '',
    password: '',
    isRegistered: false,
};

export const registerReducer = (
    state: InitialStateType = initialState,
    action: RegisterActionsType
): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/add-user':
            return {...state, email: action.email};

        case 'REGISTRATION/set-is-registered':
            return {...state, isRegistered: action.value};

        default:
            return state;
    }
};

// ==== ACTIONS =====

export const setIsRegistredAC = (value: boolean) => ({type: 'REGISTRATION/set-is-registered', value} as const);
export const addUserAC = (email: string) =>
    ({
        type: 'REGISTRATION/add-user',
        email
    } as const);

// ===== THUNKS ====

export const registerTC =
    (email: string, password: string): AppThunk => async dispatch => {
        try {
            dispatch(appSetStatusAC('loading'));
            const response = await registrationAPI.createUser(email, password);
            dispatch(addUserAC(response.data.email));
            dispatch(setIsRegistredAC(true));
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            handleNetworkError(dispatch, err);
        } finally {
            dispatch(appSetStatusAC('idle'));
        }
    };

// ==== SELECTORS ====

export const isRegisteredSelect = (state: AppRootStateType) => state.registration.isRegistered;

// ==== TYPES ====
export type addUserActionType = ReturnType<typeof addUserAC>;
export type setIsRegisteredActionType = ReturnType<typeof setIsRegistredAC>;
export type RegisterActionsType = addUserActionType | setIsRegisteredActionType;

export type InitialStateType = {
    email: string;
    password: string;
    isRegistered: boolean;
};
