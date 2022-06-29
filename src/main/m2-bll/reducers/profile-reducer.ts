import { AxiosError } from "axios";
import { AnyAction, Dispatch } from "redux";
import { isStringLiteral } from "typescript";
import { LoginResponseType, profileAPI } from "../../m3-dal/api/api";
import { appSetErrorAC, appSetStatusAC } from "./app-reducer";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const SET_PROFILE_INFO = "PROFILE/set-profile-info";
const SET_USER_NAME = "PROFILE/set-user-name";

const initialState: LoginResponseType = {
  created: "",
  email: "",
  isAdmin: "",
  name: "",
  publicCardPacksCount: 0,
  rememberMe: false,
  token: "",
  tokenDeathTime: 0,
  updated: "",
  verified: false,
  __v: 0,
  _id: "",
};

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return { ...action.payload };

    case SET_USER_NAME:
      return { ...state, name: action.name };

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const setProfileInfoAC = (payload: LoginResponseType) =>
  ({ type: SET_PROFILE_INFO, payload } as const);

export const setUserNameAC = (name: string) =>
  ({ type: SET_USER_NAME, name } as const);

// ==== THUNKS =====

export const updateUserNameTC =
  (name: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(appSetStatusAC("loading"));
    profileAPI
      .setName(name)
      .then((res) => {
        dispatch(setUserNameAC(name));
      })
      .catch((err: AxiosError) => {
        dispatch(appSetErrorAC(err.message));
      })
      .finally(() => dispatch(appSetStatusAC("idle")));
  };

// ==== TYPES ====

type InitialStateType = typeof initialState;

export type SetProfileInfoType = ReturnType<typeof setProfileInfoAC>;
export type SetUserNameACType = ReturnType<typeof setUserNameAC>;

type ProfileActionsTypes = SetProfileInfoType | SetUserNameACType;
