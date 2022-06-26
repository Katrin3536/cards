import { Dispatch } from 'redux'
import axios from 'axios';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {

    authAPI.login(data)
        .then(res=>{
            if(res.data.resultCode === 0) {
                alert('eee')

            } else {

            }
        })
        .catch(error=>{

        })
}

// types
type ActionsType = any

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})


export const authAPI = {
    login(data: any) {
        return instance.post<any>('auth/login', data)
    }
}

