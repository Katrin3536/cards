import { AxiosError } from "axios";
import { AppThunk } from "../store";
import { getPacksAPI, PacksResponseType } from "../../api/packs-api";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
  packsCards: [{}],
  cardPacksTotalCount: null as null | number,
};

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "PACKS/get-one-page-packs": {
      console.log(action.data);
      return {
        ...state,
        packsCards: action.data.cardPacks,
        cardPacksTotalCount: action.data.cardPacksTotalCount,
      };
    }

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const getPacksCardsAC = (data: PacksResponseType) =>
  ({ type: "PACKS/get-one-page-packs", data } as const);

// ==== THUNKS =====

export const getPacksListTC =
  (page: number, pageCount: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getPacksList(page, pageCount);
      if (response.status === 200) {
        dispatch(getPacksCardsAC(response.data));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getUserPacksListTC =
  (page: number, pageCount: number, userID: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getUserPacksList(
        page,
        pageCount,
        userID
      );
      if (response.status === 200) {
        dispatch(getPacksCardsAC(response.data));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getRangeredPacksListTC =
  (page: number, pageCount: number, min: number, max: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getRangeredPacksList(
        page,
        pageCount,
        min,
        max
      );
      if (response.status === 200) {
        dispatch(getPacksCardsAC(response.data));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getSortPacksListTC =
  (page: number, pageCount: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getSortPacksList(page, pageCount);
      if (response.status === 200) {
        dispatch(getPacksCardsAC(response.data));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const addPackTC =
  (
    page: number,
    pageCount: number,
    name: string,
    deckCover: string,
    _private: boolean
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.addPack(name, deckCover, _private);
      if (response.status === 200) {
        dispatch(getPacksListTC(page, pageCount));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const deletePackTC =
  (page: number, pageCount: number, packID: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.deletePack(packID);
      if (response.status === 200) {
        dispatch(getPacksListTC(page, pageCount));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const updatePackNameTC =
  (
    page: number,
    pageCount: number,
    packID: string,
    newTitile: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.updatePackName(packID, newTitile);
      if (response.status === 200) {
        dispatch(getPacksListTC(page, pageCount));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

// ==== SELECTORS ====

/*
export const appErrorSelect = (state: AppRootStateType) => state.app.error;
export const appStatusSelect = (state: AppRootStateType) => state.app.status;
export const initializeAppSelect = (state: AppRootStateType) => state.app.isInitializeApp;
*/

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type GetPacksCardsType = ReturnType<typeof getPacksCardsAC>;

export type PacksActionsTypes = GetPacksCardsType;
