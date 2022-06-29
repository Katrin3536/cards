import React from "react";
import { useAppSelector } from "../../../../m2-bll/store";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/RoutesConstants";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import style from "./Profile.module.css";

const Profile: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.authirization.isLoggedIn);
  const navigate = useNavigate();

  // if (isLoggedOut === "success") {
  //   return <>{navigate(PATH.LOGIN)}</>;
  // }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={style.profile}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper style={{ padding: "10px" }}>
            <ProfileInfo />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={{ padding: "10px" }}>Cards</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
