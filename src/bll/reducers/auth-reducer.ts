import {AppRootStateType, AppThunk} from '../store';
import {appSetErrorAC, appSetStatusAC} from './app-reducer';
import {setProfileInfoAC} from './profile-reducer';
import {authAPI, LoginPayloadType} from '../../api/authorization-api';
import {AxiosError} from 'axios';
import {handleNetworkError} from '../../utils/errorUtils';

const initialState = {
    isLoggedIn: false,
};

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/login': {
            return {...state, isLoggedIn: action.value,};
        }

        default:
            return state;
    }
};

// ==== ACTIONS =====

export const loginAC = (value: boolean) => ({type: 'AUTH/login', value} as const);

// ===== THUNKS ====

export const loginTC =
    (data: LoginPayloadType): AppThunk => async dispatch => {
        try {
            dispatch(appSetStatusAC('loading'));
            const response = await authAPI.login(data);
            dispatch(loginAC(true));
            dispatch(setProfileInfoAC(response.data));
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            handleNetworkError(dispatch, err)
        } finally {
            dispatch(appSetStatusAC('idle'));
        }
    };

export const logoutTC = (): AppThunk => async dispatch => {
    try {
        dispatch(appSetStatusAC('loading'));
        await authAPI.logout();
        dispatch(loginAC(false));
        dispatch(appSetErrorAC('You are not authorized'));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        handleNetworkError(dispatch, err)
    } finally {
        dispatch(appSetStatusAC('idle'));
    }
};

// ==== SELECTORS ====

export const isLoggedInSelector = (state: AppRootStateType) => state.authorization.isLoggedIn;

// ==== TYPES ====

type InitialStateType = typeof initialState;

export type LoginType = ReturnType<typeof loginAC>;
export type AuthActionsType = LoginType;
