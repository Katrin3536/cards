import React, { useEffect } from "react";
import Header from "../header/Header";
import RoutesConstants from "../routes/RoutesConstants";
import "./App.css";
import { useAppDispatch, useAppSelector } from "../../m2-bll/store";
import Login from "../header/pages/login/Login";
import { initializeAppTC } from "../../m2-bll/reducers/app-reducer";

export const App: React.FC = () => {
  const isInitialized = useAppSelector((state) => state.app.isInitializeApp);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return <Login />;
  }

  return (
    <div className="App">
      <Header />
      <RoutesConstants />
      {/*<Main/>*/}
    </div>
  );
};
