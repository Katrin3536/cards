import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthActionsType, authReducer } from "./reducers/auth-reducer";
import {
  RegisterActionsType,
  registerReducer,
} from "./reducers/register-reducer";
import { AppActionsTypes, appReducer } from "./reducers/app-reducer";
import {
  ForgotPassActionsType,
  forgotReducer,
} from "./reducers/forgotPass-reducer";
import {
  ProfileActionsTypes,
  profileReducer,
} from "./reducers/profile-reducer";
import { PacksActionsTypes, packsReducer } from "./reducers/packs-reducer";
import { CardsActionsTypes, cardsReducer } from "./reducers/cards-reducer";

let rootReducer = combineReducers({
  authorization: authReducer,
  registration: registerReducer,
  app: appReducer,
  recoveryPass: forgotReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType =
  | AppActionsTypes
  | AuthActionsType
  | ForgotPassActionsType
  | ProfileActionsTypes
  | RegisterActionsType
  | PacksActionsTypes
  | CardsActionsTypes;

// SELECTOR TYPE

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// DISPATCH TYPE & DISPATCH

export type useAppDispatchType = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppRootActionsType
>;
export const useAppDispatch = () => useDispatch<useAppDispatchType>();

// THUNK TYPE

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionsType
>;

//@ts-ignore

window.store = store;
