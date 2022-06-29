import React from "react";
import { PasswordRecovering } from "../header/pages/passwordRecovering/PasswordRecovering";
import Profile from "../header/pages/profile/Profile";
import { Registration } from "../header/pages/registration/Registration";
import { CheckEmail } from "../header/pages/CheckEmail/CheckEmail";
import { Routes, Route, Navigate } from "react-router-dom";
import TestPage from "../header/pages/testPage/TestPage";
import Error404 from "../header/pages/error404/Error404";
import { NewPassword } from "../header/pages/newPassword/NewPassword";
import { Login } from "../header/pages/login/Login";

export const PATH = {
  LOGIN: "/login",
  REGISTRATION: "/registration",
  PROFILE: "/profile",
  ERROR404: "/error404",
  PASSWORD_RECOVERING: "/password-recovery",
  NEW_PASSWORD: "/set-new-password/:token",
  TEST_PAGE: "/testPage",
  CHECK_EMAIL: "/check-email",
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
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      </Routes>
    </div>
  );
}

export default RoutesConstants;
