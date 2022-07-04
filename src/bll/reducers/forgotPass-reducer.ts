import {forgotPassAPI} from '../../api/forgotPass-api';
import {AppRootStateType, AppThunk} from '../store';
import {appSetErrorAC, appSetStatusAC} from './app-reducer';
import  {AxiosError} from 'axios';
import {handleNetworkError} from '../../utils/errorUtils';

const initialState = {
    success: false,
    passIsChanged: false,
};

export const forgotReducer = (
    state: InitialStateType = initialState,
    action: ForgotPassActionsType
): InitialStateType => {
    switch (action.type) {
        case 'FORGOT/recovery': {
            return {...state, success: action.value,};
        }

        case 'FORGOT/password-is-changed': {
            return {...state, passIsChanged: action.value,};
        }

        default:
            return state;
    }
};

//actions

export const forgotPassAC = (value: boolean) => ({type: 'FORGOT/recovery', value} as const);

export const passIsCangedAC = (value: boolean) => ({type: 'FORGOT/password-is-changed', value} as const);

// THUNKS

export const forgotPassTC =
    (email: string): AppThunk => async dispatch => {
        try {
            dispatch(appSetStatusAC('loading'));
            const response = await forgotPassAPI.forgot(email);
            if (response.data.success) {
                dispatch(forgotPassAC(true));
                dispatch(appSetErrorAC(null));
            }
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            handleNetworkError(dispatch, err)
        } finally {
            dispatch(appSetStatusAC('idle'));
        }
    };

export const createNewPassTC =
    (password: string, token: string | undefined): AppThunk =>
        async dispatch => {
            try {
                dispatch(appSetStatusAC('loading'));
                await forgotPassAPI.createNewPassword(password, token);
                dispatch(passIsCangedAC(true));
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>;
                handleNetworkError(dispatch, err)
            } finally {
                dispatch(appSetStatusAC('idle'));
            }
        };

// ==== SELECTORS ====

export const passIsChangedSelect = (state: AppRootStateType) => state.recoveryPass.passIsChanged;
export const successRecoverySelect = (state: AppRootStateType) => state.recoveryPass.success;

//types

export type InitialStateType = typeof initialState;

export type ForgotPassType = ReturnType<typeof forgotPassAC>;
export type PassIsCangedType = ReturnType<typeof passIsCangedAC>;

export type ForgotPassActionsType = ForgotPassType | PassIsCangedType;
