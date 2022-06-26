import React, { useEffect } from "react";
import Header from "../header/Header";
import RoutesConstants from "../routes/RoutesConstants";
import "./App.css";
import { useAppDispatch, useAppSelector } from "../../m2-bll/store";
import Login from "../header/pages/login/Login";
import { initializeAppTC } from "../../m2-bll/reducers/app-reducer";
import {ErrorSnackbar} from '../../common/с4-errorSnackbar/ErrorSnackbar';

export const App: React.FC = () => {
  const isInitialized = useAppSelector((state) => state.app.isInitializeApp);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  // if (!isInitialized) {
  //   return <div>
  //       <Header />
  //       <Login />;
  //   </div>
  // }

  return (
    <div className="App">
      <ErrorSnackbar/>
      <Header />
      <RoutesConstants />
      {/*<Main/>*/}
    </div>
  );
};
