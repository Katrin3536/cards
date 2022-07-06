import axios, { AxiosError } from "axios";
import { authAPI } from "../../api/authorization-api";
import { AppRootStateType, AppThunk } from "../store";
import {
  CardPacksType,
  getPacksCardsAPI,
  PacksResponseType,
} from "../../api/packsCards-api";
import { Dispatch } from "redux";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
  packsCards: {
    _id: null as null | string,
    user_id: null as null | string,
    name: null as null | string,
    cardsCount: null as null | number,
    created: null as null | string,
    updated: null as null | string,
  },
  cardPacksTotalCount: null as null | number,
  //   maxCardsCount: null as null | number,
  //   minCardsCount: null as null | number,
  //   page: null as null | number,   // по идее можно через локальный стейт если нужно будет
  //   pageCount: null as null | number,
};

export const packsCardsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "PACKS/get-one-page-packs":
      return {
        ...state,
        packsCards: action.data.data.item,
        cardPacksTotalCount: action.data.cardPacksTotalCount,
      };

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const getPacksCardsAC = (
  data: PacksResponseType<{ item: CardPacksType }>
) => ({ type: "PACKS/get-one-page-packs", data } as const);

// ==== THUNKS =====

export const getPacksListTC =
  (page: number, pageCount: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getPacksCardsAPI.getPacksCardsList(
        page,
        pageCount
      );
      if (response.status === 200) {
        dispatch(getPacksCardsAC(response.data.data));
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
// export type AppSetStatusType = ReturnType<typeof appSetStatusAC>;
// export type AppSetErrorType = ReturnType<typeof appSetErrorAC>;

export type PacksActionsTypes = GetPacksCardsType;
