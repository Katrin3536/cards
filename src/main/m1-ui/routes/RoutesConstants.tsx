import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TestPage from "../header/pages/testPage/TestPage";
import Error404 from "../header/pages/error404/Error404";
import Login from "../header/pages/login/Login";
import NewPassword from "../header/pages/newPassword/NewPassword";
import { PasswordRecovering } from "../header/pages/passwordRecovering/PasswordRecovering";
import Profile from "../header/pages/profile/Profile";
import { Registration } from "../header/pages/registration/Registration";

export const PATH = {
  LOGIN: "/Login",
  REGISTRATION: "/Registration",
  PROFILE: "/Profile",
  ERROR404: "/Error404",
  PASSWORD_RECOVERING: "/PasswordRecovering",
  NEW_PASSWORD: "/NewPassword",
  TEST_PAGE: "/TestPage",
};

function RoutesConstants() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Navigate to={PATH.LOGIN} />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTRATION} element={<Registration />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.ERROR404} element={<Error404 />} />
        <Route
          path={PATH.PASSWORD_RECOVERING}
          element={<PasswordRecovering />}
        />
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH.TEST_PAGE} element={<TestPage />} />
        <Route path={"/*"} element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default RoutesConstants;
