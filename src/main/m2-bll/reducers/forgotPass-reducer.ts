import { AnyAction, Dispatch } from "redux";
import { forgotPassAPI } from "../../m3-dal/api/api";
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
        success: !state.success,
      };
    }

    case PASSWORD_IS_CHANGED: {
      return {
        ...state,
        passIsChanged: !state.passIsChanged,
      };
    }

    default:
      return state;
  }
};

//actions

export const forgotPassAC = () => ({ type: FORGOT_PASSWORD } as const);
export const passIsCangedAC = () => ({ type: PASSWORD_IS_CHANGED } as const);

// THUNKS

export const forgotPassTC =
  (email: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    forgotPassAPI
      .forgot(email)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          dispatch(forgotPassAC());
        }
      })
      .catch((e) => dispatch(appSetErrorAC(e.response.data.error)))
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

export const createNewPassTC =
  (password: string, token: string | undefined) =>
  (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    console.log(password, token);
    forgotPassAPI
      .createNewPassword(password, token)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert(response.data.info);
          dispatch(passIsCangedAC());
        }
      })
      .catch((e) => dispatch(appSetErrorAC(e.response.data.error)))
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

//types

export type ForgotPassType = ReturnType<typeof forgotPassAC>;
export type PassIsCangedType = ReturnType<typeof passIsCangedAC>;

export type AuthActionsType = ForgotPassType | PassIsCangedType;
