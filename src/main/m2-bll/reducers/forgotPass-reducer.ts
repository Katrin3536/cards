import { AxiosResponse } from "axios";
import { AnyAction, Dispatch } from "redux";
import { authAPI, forgotPassAPI } from "../../m3-dal/api/api";
import { appSetStatusAC } from "./app-reducer";

const initialState = {
  success: false,
};

type InitialStateType = typeof initialState;

const FORGOT_PASSWORD = "FORGOT/recovery";

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

    default:
      return state;
  }
};

//actions

export const forgotPassAC = () => ({ type: FORGOT_PASSWORD } as const);

// THUNKS

export const forgotPassTC =
  (email: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    forgotPassAPI
      .forgot(email)
      .then((response) => console.log(response.data.info))
      .catch((e) => console.log(e.response.data.error))
      // if (res.info === "logOut success —ฅ/ᐠ.̫ .ᐟ\ฅ—") {
      //   dispatch(logoutAC());
      // } else {
      // dispatch(appSetErrorAC(res.error));

      // .catch((err: AxiosError) => {
      //   dispatch(appSetErrorAC(err.message));
      // });
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

//types

export type ForgotPassType = ReturnType<typeof forgotPassAC>;
export type AuthActionsType = ForgotPassType;
