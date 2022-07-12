import { AxiosResponse } from "axios";
import { instance } from "./api-instance";

export const getPacksAPI = {
  getUserPacksList(userID: string) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?user_id=${userID}`
    );
  },

  getPacksList(page: number, pageCount: number) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?page=${page}&pageCount=${pageCount}`
    );
  },

  getSearchPacksList(value: string) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?packName=${value}`
    );
  },

  getRangeredPacksList(
    page: number,
    pageCount: number,
    min: number = 0,
    max: number
  ) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?page=${page}&pageCount=${pageCount}&min=${min}&max=${max}`
    );
  },

  getSortPacksList(sortUpdate: string) {
    return instance.get<any, AxiosResponse<PacksResponseType>, any>(
      `cards/pack?sortPacks=${sortUpdate}`
    );
  },

  addPack(name: string) {
    const data: AddPackPayloadType = {
      cardsPack: {
        name,
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
