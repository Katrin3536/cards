import { AxiosError } from "axios";
import { AnyAction, Dispatch } from "redux";
import { forgotPassAPI } from "../../m3-dal/api/api";
import { AppRootStateType } from "../store";
import { appSetErrorAC, appSetStatusAC } from "./app-reducer";

const initialState = {
  success: false,
  passIsChanged: false,
};

type InitialStateType = typeof initialState;

const FORGOT_PASSWORD = "FORGOT/recovery";
const PASSWORD_IS_CHANGED = "FORGOT/password-is-changed";

export const forgotReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case FORGOT_PASSWORD: {
      return {
        ...state,
        success: action.value,
      };
    }

    case PASSWORD_IS_CHANGED: {
      return {
        ...state,
        passIsChanged: action.value,
      };
    }

    default:
      return state;
  }
};

//actions

export const forgotPassAC = (value: boolean) =>
  ({ type: FORGOT_PASSWORD, value } as const);
export const passIsCangedAC = (value: boolean) =>
  ({ type: PASSWORD_IS_CHANGED, value } as const);

// THUNKS

export const forgotPassTC =
  (email: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    forgotPassAPI
      .forgot(email)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          dispatch(forgotPassAC(true));
          dispatch(appSetErrorAC(null));
        }
      })
      .catch((err: AxiosError) => dispatch(appSetErrorAC(err.message)))
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const createNewPassTC =
  (password: string, token: string | undefined) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    forgotPassAPI
      .createNewPassword(password, token)
      .then((response) => {
          dispatch(passIsCangedAC(true));
      })
        .catch((err) => {
            dispatch(
                appSetErrorAC(err.response.data.error || "Some error occurred")
            )})
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

// ==== SELECTORS ====

export const passIsChangedSelect = (state: AppRootStateType) =>
  state.recoveryPass.passIsChanged;
export const successRecoverySelect = (state: AppRootStateType) =>
  state.recoveryPass.success;

//types

export type ForgotPassType = ReturnType<typeof forgotPassAC>;
export type PassIsCangedType = ReturnType<typeof passIsCangedAC>;

export type AuthActionsType = ForgotPassType | PassIsCangedType;
