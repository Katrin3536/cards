import axios, {AxiosError} from 'axios';
import {authAPI} from '../../api/authorization-api';
import {AppRootStateType, AppThunk} from '../store';
import {loginAC, LoginType} from './auth-reducer';
import {setProfileInfoAC} from './profile-reducer';
import {getCardsAPI} from "../../api/cards-api";
import {Dispatch} from "redux";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
    cardPacks: [
        {
            _id: null,
            user_id: null,
            name: null,
            cardsCount: null,
            created: null,
            updated: null
        },
    ],
    cardPacksTotalCount: null,
    // количество колод
    maxCardsCount: null,
    minCardsCount: null,
    page: null,// выбранная страница
    pageCount: null
    // количество элементов на странице
};

export const packsCardsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'get-all-cards':
            return {...action.data};

        /*case 'APP/app-error':
            return {...state, error: action.error,};*/

        default:
            return state;
    }
};

// ==== ACTIONS =====

export const getAllCardsAC = (data: any) => ({type: 'get-all-cards', data} as const);

//export const appSetErrorAC = (error: null | string) => ({type: 'APP/app-error', error} as const);

// ==== THUNKS =====

export const getCardsListTC = (): any => {
    console.log('211212')
    return (dispatch: Dispatch<any>) => {
        getCardsAPI.getCardsList()
        .then((response)=>{
            dispatch(getAllCardsAC(response.data));
        })
        //@ts-ignore

    } /*catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message;
            console.log(error)
        } else {
            //dispatch(appSetErrorAC(err.message));
        }
    }*/
};

// ==== SELECTORS ====


/*

export const appErrorSelect = (state: AppRootStateType) => state.app.error;
export const appStatusSelect = (state: AppRootStateType) => state.app.status;
export const initializeAppSelect = (state: AppRootStateType) => state.app.isInitializeApp;
*/

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
/*
export type InitializeAppType = ReturnType<typeof initializeAppAC>;
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>;
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>;

export type AppActionsTypes =
    | InitializeAppType
    | AppSetStatusType
    | AppSetErrorType
    | LoginType;
*/
