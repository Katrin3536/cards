import { AxiosError } from "axios";
import { AppRootStateType, AppThunk } from "../store";
import { getPacksAPI, PacksResponseType } from "../../api/packs-api";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";

const initialState = {
  packsCards: [
    {
      _id: "",
      user_id: "",
      name: "",
      cardsCount: 0,
      created: "",
      updated: "",
    },
  ],
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
};

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "PACKS/get-one-page-packs": {
      return {
        ...state,
        packsCards: action.data.cardPacks,
        cardPacksTotalCount: action.data.cardPacksTotalCount,
      };
    }

    case "PACKS/set-page": {
      return {
        ...state,
        page: action.page,
      };
    }

    case "PACKS/set-countPage": {
      return {
        ...state,
        pageCount: action.pageCount,
      };
    }

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const getPacksCardsAC = (data: PacksResponseType) =>
  ({ type: "PACKS/get-one-page-packs", data } as const);

export const setPageAC = (page: number) =>
  ({ type: "PACKS/set-page", page } as const);

export const setPageCountAC = (pageCount: number) =>
  ({ type: "PACKS/set-countPage", pageCount } as const);

// ==== THUNKS =====

export const getPacksListTC =
  (page: number, pageCount: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getPacksList(page, pageCount);

      dispatch(getPacksCardsAC(response.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getUserPacksListTC =
  (userID: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getUserPacksList(userID);

      dispatch(getPacksCardsAC(response.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getSearchPacksListTC =
  (value: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getSearchPacksList(value);

      dispatch(getPacksCardsAC(response.data));
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

      dispatch(getPacksCardsAC(response.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getSortPacksListTC =
  (sortUpdate: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.getSortPacksList(sortUpdate);

      dispatch(getPacksCardsAC(response.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const addPackTC =
  (page: number, pageCount: number, name: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksAPI.addPack(name);
      dispatch(getPacksListTC(page, pageCount));
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
      dispatch(getPacksListTC(page, pageCount));
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
      dispatch(getPacksListTC(page, pageCount));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

// ==== SELECTORS ====

export const packsSelect = (state: AppRootStateType) => state.packs.packsCards;
export const totalPacksCountSelect = (state: AppRootStateType) =>
  state.packs.cardPacksTotalCount;
export const pageSelect = (state: AppRootStateType) => state.packs.page;
export const pageCountSelect = (state: AppRootStateType) =>
  state.packs.pageCount;

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type GetPacksCardsType = ReturnType<typeof getPacksCardsAC>;
export type SetPageType = ReturnType<typeof setPageAC>;
export type SetPageCountType = ReturnType<typeof setPageCountAC>;

export type PacksActionsTypes =
  | GetPacksCardsType
  | SetPageType
  | SetPageCountType;
