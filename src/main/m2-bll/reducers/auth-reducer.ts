import { AxiosError } from "axios";
import { AnyAction, Dispatch } from "redux";
import { authAPI, LoginParamsType } from "../../m3-dal/api/api";
import { appSetErrorAC, appSetStatusAC } from "./app-reducer";

const initialState = {
  isLoggedIn: false,
  isLoggedOut: "",
};

type InitialStateType = typeof initialState;

const AUTH_ME = "AUTH/auth-me";
const LOGIN = "AUTH/login";
const LOGOUT = "AUTH/logout";

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isLoggedOut: "success",
      };
    }

    default:
      return state;
  }
};

//actions

// export const authMeAC = () => ({ type: AUTH_ME } as const);
export const loginAC = () => ({ type: LOGIN } as const);
export const logoutAC = () => ({ type: LOGOUT } as const);

// THUNKS

export const loginTC =
  (data: LoginParamsType) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    console.log("login +");
    authAPI
      .login(data)
      .then((res) => {
        dispatch(loginAC());
        // if (res.data.resultCode === 0) {
        //   dispatch(loginAC());
        // } else {
        //   dispatch(appSetErrorAC(res.data.messages[0]));
        // }
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
      dispatch(logoutAC());
    })
    .catch((err: AxiosError) => {
      dispatch(appSetErrorAC(err.message));
    })
    .finally(() => dispatch(appSetStatusAC("idle")));
};

//types

// export type AuthMeType = ReturnType<typeof authMeAC>;
export type LoginType = ReturnType<typeof loginAC>;
export type LogoutType = ReturnType<typeof logoutAC>;
export type AuthActionsType =
  //  AuthMeType
  LoginType | LogoutType;
