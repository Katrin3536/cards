import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const getPacksAPI = {
  getUserPacksList(page: number, pageCount: number = 8, userID: string) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?page=${page}&pageCount=${pageCount}&user_id=${userID}`
    );
  },
  getPacksList(page: number, pageCount: number = 8) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?page=${page}&pageCount=${pageCount}`
    );
  },

  getRangeredPacksList(
    page: number,
    pageCount: number = 8,
    min: number = 0, // значения брать из range
    max: number = 110 // значения брать из range
  ) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?page=${page}&pageCount=${pageCount}&min=${min}&max=${max}`
    );
  },

  getSortPacksList(page: number, pageCount: number = 8) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=0updated`
    );
  },

  addPack(name: string, deckCover: string = "", _private: boolean = false) {
    //response игнорируем, заново запрос колод!!!

    const data: AddPackPayloadType = {
      cardsPack: {
        name: name,
        deckCover: deckCover,
        private: _private,
      },
    };
    return instance.post<
      any,
      AxiosResponse<PUDResponseType>,
      AddPackPayloadType
    >(`cards/pack`, data);
  },

  deletePack(packID: string) {
    return instance.delete<AxiosResponse<PUDResponseType>>(
      `cards/pack?id=${packID}`
    );
  },

  updatePackName(packID: string, newTitile: string) {
    const data: UpdatePackNamePayloadType = {
      cardsPack: {
        _id: packID,
        name: newTitile,
      },
    };

    return instance.put<
      any,
      AxiosResponse<PUDResponseType>,
      UpdatePackNamePayloadType
    >(`cards/pack`, data);
  },
};

// ==== TYPES ====

export type AddPackPayloadType = {
  cardsPack: {
    name: string;
    deckCover?: string;
    private?: boolean;
  };
};

export type UpdatePackNamePayloadType = {
  cardsPack: {
    _id: string;
    name: string;
  };
};

export type CardPacksType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

export type PacksResponseType = {
  cardPacks: Array<CardPacksType>;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type PUDResponseType = {
  cardPacks: Array<CardPacksType>;
  token: string;
  tokenDeathTime: number;
};
