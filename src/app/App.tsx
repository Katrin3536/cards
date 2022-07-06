import React, { useEffect } from "react";
import { Header } from "../components/header/Header";
import { RoutesConstants } from "../components/common/routes/RoutesConstants";
import "./App.css";
import { useAppDispatch, useAppSelector } from "../bll/store";
import {
  initializeAppSelect,
  initializeAppTC,
} from "../bll/reducers/app-reducer";
import { ErrorSnackbar } from "../components/errorSnackbar/ErrorSnackbar";
import CircularProgress from "@mui/material/CircularProgress";

export const App: React.FC = () => {
  const isInitialized = useAppSelector(initializeAppSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <RoutesConstants />
    </div>
  );
};
