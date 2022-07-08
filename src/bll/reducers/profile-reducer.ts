import { appSetStatusAC } from "./app-reducer";
import { AppRootStateType, AppThunk } from "../store";
import { profileAPI } from "../../api/profile-api";
import { LoginResponseType } from "../../api/authorization-api";
import { AxiosError } from "axios";
import { handleNetworkError } from "../../utils/errorUtils";

const initialState: LoginResponseType = {
  created: "",
  email: "",
  isAdmin: "",
  name: "",
  avatar: "",
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
    case "PROFILE/set-profile-info":
      return { ...action.payload };

    case "PROFILE/set-user-name":
      return { ...state, name: action.name };

    case "PROFILE/set-user-avatar":
      return { ...state, avatar: action.avatar };

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const setProfileInfoAC = (payload: LoginResponseType) =>
  ({ type: "PROFILE/set-profile-info", payload } as const);

export const setUserNameAC = (name: string) =>
  ({ type: "PROFILE/set-user-name", name } as const);

export const setUserAvatarAC = (avatar: string) =>
  ({ type: "PROFILE/set-user-avatar", avatar } as const);

// ==== THUNKS =====

export const updateUserNameTC =
  (name: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      await profileAPI.setName(name);
      dispatch(setUserNameAC(name));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const updateUserAvatarTC =
  (avatar: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      await profileAPI.setAvatar(avatar);
      dispatch(setUserAvatarAC(avatar));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

// ==== SELECTORS ====

export const profileSelect = (state: AppRootStateType) => state.profile;
export const userIDSelect = (state: AppRootStateType) => state.profile._id;

// ==== TYPES ====

type InitialStateType = typeof initialState;

export type SetProfileInfoType = ReturnType<typeof setProfileInfoAC>;
export type SetUserNameACType = ReturnType<typeof setUserNameAC>;
export type SetUserAvatarACType = ReturnType<typeof setUserAvatarAC>;

export type ProfileActionsTypes =
  | SetProfileInfoType
  | SetUserNameACType
  | SetUserAvatarACType;
