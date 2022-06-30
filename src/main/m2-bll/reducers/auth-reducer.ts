import { AxiosError } from "axios";
import { AnyAction, Dispatch } from "redux";
import { authAPI, LoginParamsType } from "../../m3-dal/api/api";
import { AppRootStateType } from "../store";
import { appSetErrorAC, appSetStatusAC } from "./app-reducer";
import {setProfileInfoAC} from './profile-reducer';

const initialState = {
  isLoggedIn: false,
};

const LOGIN = "AUTH/login";

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: action.value,
      };
    }

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const loginAC = (value: boolean) => ({ type: LOGIN, value } as const);

// ===== THUNKS ====

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    console.log("login +");
    authAPI
      .login(data)
      .then((res) => {
        dispatch(loginAC(true));
          dispatch(setProfileInfoAC(res.data));
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const logoutTC = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(appSetStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      dispatch(loginAC(false));
      dispatch(appSetErrorAC("You are not authorized"));
    })
    .catch((err: AxiosError) => {
      dispatch(appSetErrorAC(err.message));
    })
    .finally(() => dispatch(appSetStatusAC("idle")));
};

// ==== SELECTORS ====

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.authirization.isLoggedIn;

// ==== TYPES ====

type InitialStateType = typeof initialState;

export type LoginType = ReturnType<typeof loginAC>;
export type AuthActionsType = LoginType;
