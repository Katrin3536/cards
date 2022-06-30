import React, { useEffect } from "react";
import Header from "../header/Header";
import { RoutesConstants } from "../routes/RoutesConstants";
import "./App.css";
import { useAppDispatch, useAppSelector } from "../../m2-bll/store";
import { Login } from "../header/pages/login/Login";
import {
  initializeAppSelect,
  initializeAppTC,
} from "../../m2-bll/reducers/app-reducer";
import { ErrorSnackbar } from "../../common/c4-errorSnackbar/ErrorSnackbar";

export const App: React.FC = () => {
  const isInitialized = useAppSelector(initializeAppSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div>
        <ErrorSnackbar />
        <Header />
        <Login />;
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <RoutesConstants />
      {/*<Main/>*/}
    </div>
  );
};
