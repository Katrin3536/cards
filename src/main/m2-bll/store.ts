import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth-reducer";
import { registerReducer } from "./reducers/register-reducer";
import { appReducer } from "./reducers/app-reducer";
import { forgotReducer } from "./reducers/forgotPass-reducer";

let rootReducer = combineReducers({
  authirization: authReducer,
  registration: registerReducer,
  app: appReducer,

  recoveryPass: forgotReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// SELECTOR TYPE
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// DISPATCH TYPE & DISPATCH
export type useAppDispatchType = ThunkDispatch<
  AppRootStateType,
  unknown,
  AnyAction
>;
export const useAppDispatch = () => useDispatch<useAppDispatchType>();

// THUNK TYPE
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;

//@ts-ignore

window.store = store;
