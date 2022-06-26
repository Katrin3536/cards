import { AxiosError } from "axios";
import { AnyAction, Dispatch } from "redux";
import { authAPI } from "../../m3-dal/api/api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const INITIALIZE_APP = "APP/initialized";
const APP_SET_STATUS = "APP/app-status";
const APP_SET_ERROR = "APP/app-error";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitializeApp: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsTypes
): InitialStateType => {
  switch (action.type) {
    case INITIALIZE_APP:
      return {
        ...state,
        isInitializeApp: !state.isInitializeApp,
      };

    case APP_SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case APP_SET_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const initializeAppAC = () => ({ type: INITIALIZE_APP } as const);

export const appSetStatusAC = (status: RequestStatusType) =>
  ({ type: APP_SET_STATUS, status } as const);

export const appSetErrorAC = (error: null | string) =>
  ({ type: APP_SET_ERROR, error } as const);

// ==== THUNKS =====

export const initializeAppTC = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(appSetStatusAC("loading"));
  authAPI
    .authMe()
    .then((response) => {
      dispatch(initializeAppAC());
      // if (response.data.resultCode === 0) {
      //   dispatch(authMeAC());
      // }
    })
    .catch((err: AxiosError) => {
      dispatch(appSetErrorAC(err.message));
    })
    .finally(() => dispatch(appSetStatusAC("idle")));
};

// ==== TYPES ====

export type InitializeAppType = ReturnType<typeof initializeAppAC>;
export type AppSetStatusType = ReturnType<typeof appSetStatusAC>;
export type AppSetErrorType = ReturnType<typeof appSetErrorAC>;

type AppActionsTypes = InitializeAppType | AppSetStatusType | AppSetErrorType;
