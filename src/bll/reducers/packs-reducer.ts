import { AxiosError } from "axios";
import { AppRootStateType, AppThunk } from "../store";
import {
    CardPacksType,
    getPacksAPI,
    PacksResponseType,
} from "../../api/packs-api";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
    allPacks: [
        {
            _id: "",
            user_id: "",
            name: "",
            cardsCount: 0,
            created: "",
            updated: "",
        },
    ],
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
    cardPacksTotalCount: 0,
};

export const packsReducer = (
    state: InitialStateType = initialState,
    action: PacksActionsTypes
): InitialStateType => {
    switch (action.type) {
        case "PACKS/get-all-packs": {
            console.log(action.data);
            return {
                ...state,
                allPacks: action.data.cardPacks,
            };
        }

        case "PACKS/get-one-page-packs": {
            return {
                ...state,
                packsCards: action.data.cardPacks,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
            };
        }

        case "PACKS/set-filtered-packs": {
            return {
                ...state,
                packsCards: action.data,
            };
        }

        default:
            return state;
    }
};

// ==== ACTIONS =====

export const getAllPacksAC = (data: PacksResponseType) =>
    ({ type: "PACKS/get-all-packs", data } as const);

export const getPacksCardsAC = (data: PacksResponseType) =>
    ({ type: "PACKS/get-one-page-packs", data } as const);

export const setFilteredPacksAC = (data: Array<CardPacksType>) =>
    ({ type: "PACKS/set-filtered-packs", data } as const);

// ==== THUNKS =====

export const getAllPacksListTC =
    (pageCount: number): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appSetStatusAC("loading"));
                const response = await getPacksAPI.getAllPacksList(pageCount);
                console.log(response);
                if (response.status === 200) {
                    dispatch(getAllPacksAC(response.data));
                }
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>;
                handleNetworkError(dispatch, err);
            } finally {
                dispatch(appSetStatusAC("idle"));
            }
        };

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
    (userID: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appSetStatusAC("loading"));
                const response = await getPacksAPI.getUserPacksList(userID);
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
    (name: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appSetStatusAC("loading"));
                const response = await getPacksAPI.addPack(name);
                // if (response.status === 200) {
                //   dispatch(getPacksListTC(page, pageCount));
                // }
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>;
                handleNetworkError(dispatch, err);
            } finally {
                dispatch(appSetStatusAC("idle"));
            }
        };

export const deletePackTC =
    (packID: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appSetStatusAC("loading"));
                const response = await getPacksAPI.deletePack(packID);
                // if (response.status === 200) {
                //   dispatch(getPacksListTC(page, pageCount));
                // }
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>;
                handleNetworkError(dispatch, err);
            } finally {
                dispatch(appSetStatusAC("idle"));
            }
        };

export const updatePackNameTC =
    (packID: string, newTitile: string): AppThunk =>
        async (dispatch) => {
            try {
                dispatch(appSetStatusAC("loading"));
                const response = await getPacksAPI.updatePackName(packID, newTitile);
                // if (response.status === 200) {
                //   dispatch(getPacksListTC(page, pageCount));
                // }
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

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type GetPacksCardsType = ReturnType<typeof getPacksCardsAC>;
export type GetAllPacksType = ReturnType<typeof getAllPacksAC>;
export type SetFilteredPacksType = ReturnType<typeof setFilteredPacksAC>;

export type PacksActionsTypes =
    | GetAllPacksType
    | GetPacksCardsType
    | SetFilteredPacksType;