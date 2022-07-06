import { AxiosError } from "axios";
import { AppRootStateType, AppThunk } from "../store";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";
import { CardsResponseType, CardType, getCardsAPI } from "../../api/cards-api";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
  cards: [
    {
      _id: "",
      cardsPack_id: "",
      user_id: "",
      answer: "",
      question: "",
      grade: 0,
      shots: 0,
      comments: "",
      type: "",
      rating: 0,
      more_id: "",
      created: "",
      updated: "",
      __v: 0,
    },
  ],
  cardsTotalCount: 0,
};

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "CARDS/get-one-page-cards": {
      console.log(action.data);
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
      };
    }

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const getCardsAC = (data: CardsResponseType) =>
  ({ type: "CARDS/get-one-page-cards", data } as const);
//

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
        dispatch(getCardsAC(response.data));
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
        dispatch(getCardsListTC(page, pageCount, cardsPack_id));
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

export const cardsSelect = (state: AppRootStateType) => state.cards.cards;

// ==== TYPES ====
export type InitialStateType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type CardListType = Array<CardType> & {
  cardsTotalCount: number;
};

export type GetCardsType = ReturnType<typeof getCardsAC>;

export type CardsActionsTypes = GetCardsType;
