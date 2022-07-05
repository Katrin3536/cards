import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const getPacksCardsAPI = {
  getUserPacksCardsList(userID: string) {
    return instance.get<AxiosResponse<ResponseType<{ item: CardPacksType }>>>(
      `cards/pack?user_id=${userID}`
    );
  },
  getPacksCardsList(page: number, pageCount: number = 8) {
    return instance.get<AxiosResponse<ResponseType<{ item: CardPacksType }>>>(
      `cards/pack?page=${page}&pageCount=${pageCount}`
    );
  },

  getRangeredPacksCardsList(
    page: number,
    pageCount: number = 8,
    min: number = 0, // значения брать из range
    max: number = 110 // значения брать из range
  ) {
    return instance.get<AxiosResponse<ResponseType<{ item: CardPacksType }>>>(
      `cards/pack?page=${page}&pageCount=${pageCount}&min=${min}&max=${max}`
    );
  },

  getSortPacksCardsList(page: number, pageCount: number = 8) {
    return instance.get<AxiosResponse<ResponseType<{ item: CardPacksType }>>>(
      `cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=0updated`
    );
  },

  addPackCards(
    name: string,
    deckCover: string = "",
    _private: boolean = false
  ) {
    //response игнорируем, заново запрос колод!!!

    const data: AddPackCardPayloadType = {
      cardsPack: {
        name: name,
        deckCover: deckCover,
        private: _private,
      },
    };
    return instance.post<
      any,
      AxiosResponse<PUDResponseType<{ item: CardPacksType }>>,
      AddPackCardPayloadType
    >(`cards/pack`, data);
  },

  deletePackCards(packID: string) {
    return instance.delete<
      AxiosResponse<PUDResponseType<{ item: CardPacksType }>>
    >(`cards/pack?id=${packID}`);
  },

  updateNamePackCards(packID: string, newTitile: string) {
    const data: UpdatePackNamePayloadType = {
      cardsPack: {
        _id: packID,
        name: newTitile,
      },
    };

    return instance.put<
      any,
      AxiosResponse<PUDResponseType<{ item: CardPacksType }>>,
      UpdatePackNamePayloadType
    >(`cards/pack`, data);
  },
};

// ==== TYPES ====

type AddPackCardPayloadType = {
  cardsPack: {
    name: string;
    deckCover?: string;
    private?: boolean;
  };
};

type UpdatePackNamePayloadType = {
  cardsPack: {
    _id: string;
    name: string;
  };
};

type CardPacksType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

type ResponseType<D = {}> = {
  data: D;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

type PUDResponseType<D = {}> = {
  data: D;
  token: string;
  tokenDeathTime: number;
};
