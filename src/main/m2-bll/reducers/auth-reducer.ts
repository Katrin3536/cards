import { AnyAction, Dispatch } from "redux";
import { authAPI } from "../../m3-dal/api/api";

const initialState = {
  isAuth: false,
};

type InitialStateType = typeof initialState;

// const LOGIN = "AUTH/login";
const LOGOUT = "AUTH/logout";

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    }

    default:
      return state;
  }
};

//actions

export const logoutAC = () => ({ type: LOGOUT } as const);

// THUNKS

export const logoutTC = () => (dispatch: Dispatch<AnyAction>) => {
  // dispatch(appSetStatusAC("loading"));
  authAPI.logout().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(logoutAC());
    } else {
      // dispatch(appSetErrorAC(res.data.messages[0]));
    }
  });
  // .catch((err: AxiosError) => {
  //   dispatch(appSetErrorAC(err.message));
  // });
  // .finally(() => dispatch(appSetStatusAC("idle")));
};

//types

export type LogoutType = ReturnType<typeof logoutAC>;
export type AuthActionsType = LogoutType;
