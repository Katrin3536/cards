import {Dispatch} from 'redux';
import {registrationAPI} from '../../m3-dal/api/api';
import {appSetErrorAC, appSetStatusAC} from './app-reducer';
import {AxiosError, AxiosResponse} from 'axios';

const initialState = {
    email: '',
    password: '',
    isRegistered:false,
};

const REGISTRATION_ADD_USER = 'REGISTRATION/ADD-USER';
const REGISTRATION_SET_IS_REGISTRED = 'REGISTRATION/SET-IS-REGISTRED';
export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION_ADD_USER:
            return {...state, email: action.email, password: action.password};
        case REGISTRATION_SET_IS_REGISTRED:
            return {...state, isRegistered: action.value}
        default:
            return state;
    }
};

//actions
export const setIsRegistredAC = (value: boolean) =>({type: 'REGISTRATION/SET-IS-REGISTRED', value} as const)
export const addUserAC = (email: string, password: string) => ({type: 'REGISTRATION/ADD-USER', email, password} as const);
//thunks
export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
    registrationAPI.createUser(email, password)
        .then(res => {
            dispatch(addUserAC(res.data.email, res.data.password))
            dispatch(setIsRegistredAC(true));
            dispatch(appSetStatusAC('succeeded'))
        })
        .catch((err) => {
            console.log(err);
            dispatch(appSetErrorAC(err.response.data.error || 'Some error occurred'));
            dispatch(appSetStatusAC('failed'));
        })
};
//types
export type addUserActionType = ReturnType<typeof addUserAC>
export type setIsRegistredActionType = ReturnType<typeof setIsRegistredAC>
export type ActionsType = addUserActionType | setIsRegistredActionType
export type InitialStateType = {
    email: string,
    password: string,
    isRegistered: boolean,
}


