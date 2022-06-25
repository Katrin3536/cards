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
import {testReducer} from './reducers/test-reducer';

let rootReducer = combineReducers({
  state: testReducer,
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
export type useAppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  AnyAction
>;
export const useAppDispatch = () => useDispatch<useAppDispatch>();

// THUNK TYPE
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;

//@ts-ignore

window.store = store;
