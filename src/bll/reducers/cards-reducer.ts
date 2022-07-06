import { AxiosError } from "axios";
import { AppThunk } from "../store";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";
import { CardsResponseType, CardType, getCardsAPI } from "../../api/cards-api";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
  // cards: {
  //   _id: null as null | string,
  //   cardsPack_id: null as null | string,
  //   user_id: null as null | string,
  //   answer: null as null | string,
  //   question: null as null | string,
  //   grade: null as null | number,
  //   shots: null as null | number,
  //   comments: null as null | string,
  //   type: null as null | string,
  //   rating: null as null | number,
  //   more_id: null as null | string,
  //   created: null as null | string,
  //   updated: null as null | string,
  //   __v: null as null | number,
  // },
  cards: [{}],
  cardsTotalCount: null as null | number,
  //   maxGrade: null as null | number,
  //   minGrade: null as null | number,
  //   page: null as null | number,   // по идее можно через локальный стейт если нужно будет
  //   pageCount: null as null | number,
};

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "CARDS/get-one-page-cards":
      return {
        ...state,
        cards: action.data.data.map((card) => card.item),
        cardsTotalCount: action.data.cardsTotalCount,
      };

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const getCardsAC = (data: CardsResponseType<{ item: CardType }>) =>
  ({ type: "CARDS/get-one-page-cards", data } as const);

// ==== THUNKS =====

export const getCardsListTC =
  (page: number, pageCount: number, cardsPackID: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.getCardsList(
        page,
        pageCount,
        cardsPackID
      );
      if (response.status === 200) {
        dispatch(getCardsAC(response.data.data));
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
      const response = await getCardsAPI.getSortCardsList(page, pageCount);
      if (response.status === 200) {
        dispatch(getCardsAC(response.data.data));
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
      const response = await getCardsAPI.getGradedCardsList(
        page,
        pageCount,
        min,
        max
      );
      if (response.status === 200) {
        dispatch(getCardsAC(response.data.data));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const addCardTC =
  (
    page: number,
    pageCount: number,
    cardsPackID: string,
    question: string,
    answer: string,
    cardsPack_id: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.addCard(
        question,
        answer,
        cardsPack_id
      );
      if (response.status === 200) {
        dispatch(getCardsListTC(page, pageCount, cardsPackID));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const deleteCardTC =
  (
    page: number,
    pageCount: number,
    cardsPackID: string,
    cardID: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.deleteCard(cardID);
      if (response.status === 200) {
        dispatch(getCardsListTC(page, pageCount, cardsPackID));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const updateCardTC =
  (
    page: number,
    pageCount: number,
    cardsPackID: string,
    cardID: string,
    newQuestion: string,
    newAnswer: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.updateCard(
        cardID,
        newQuestion,
        newAnswer
      );
      if (response.status === 200) {
        dispatch(getCardsListTC(page, pageCount, cardsPackID));
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

// ==== SELECTORS ====

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type CardListType = Array<CardType> & {
  cardsTotalCount: number;
};

export type GetCardsType = ReturnType<typeof getCardsAC>;

export type CardsActionsTypes = GetCardsType;
