import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const getCardsAPI = {
  getCardsList(page: number, pageCount: number = 8, cardsPackID: string) {
    return instance.get<AxiosResponse<CardsResponseType<{ item: CardType }>>>(
      `cards/card?page=${page}&pageCount=${pageCount}&cardsPack_id=${cardsPackID}`
    );
  },

  getSortCardsList(page: number, pageCount: number = 8) {
    return instance.get<AxiosResponse<CardsResponseType<{ item: CardType }>>>(
      `cards/card?page=${page}&pageCount=${pageCount}&sortCards=0grade`
    );
  },

  getGradedCardsList(
    page: number,
    pageCount: number = 8,
    min: number = 0,
    max: number = 5
  ) {
    return instance.get<AxiosResponse<CardsResponseType<{ item: CardType }>>>(
      `cards/card?page=${page}&pageCount=${pageCount}&min=${min}&max=${max}`
    );
  },

  addCard(question: string, answer: string, cardsPack_id: string) {
    const data: AddCardPayloadType = {
      card: {
        cardsPack_id,
        question,
        answer,
      },
    };
    return instance.post<
      any,
      AxiosResponse<PUDResponseType<{ item: CardType }>>,
      AddCardPayloadType
    >(`cards/card`, data);
  },

  deleteCard(cardID: string) {
    return instance.delete<AxiosResponse<PUDResponseType<{ item: CardType }>>>(
      `cards/card?id=${cardID}`
    );
  },

  updateCard(cardID: string, newQuestion: string, newAnswer: string) {
    const data: UpdateCardPayloadType = {
      card: {
        _id: cardID,
        question: newQuestion,
        answer: newAnswer,
      },
    };

    return instance.put<
      any,
      AxiosResponse<PUDResponseType<{ item: CardType }>>,
      UpdateCardPayloadType
    >(`cards/card`, data);
  },
};

// ==== TYPES ====

export type AddCardPayloadType = {
  card: {
    cardsPack_id: string;
    question: string;
    answer: string;
  };
};

export type UpdateCardPayloadType = {
  card: {
    _id: string;
    question: string;
    answer: string;
  };
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type CardsResponseType<D = {}> = {
  data: Array<D>;
  packUserId: string;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  token: string; //???
  tokenDeathTime: number; //???
};

export type PUDResponseType<D = {}> = {
  data: D;
  token: string;
  tokenDeathTime: number;
};
