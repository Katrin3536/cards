import React from "react";
import { useAppSelector } from "../../../../m2-bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../routes/RoutesConstants";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import style from "./Profile.module.css";
import { LinearProgress } from "@mui/material";

const Profile: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.authirization.isLoggedIn);
  const status = useAppSelector((state) => state.app.status);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }
  console.log(document.cookie);
  return (
    <>
      {status === "loading" && <LinearProgress />}
      <div className={style.profile}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {/* <Paper style={{ padding: "10px" }}> */}
            <ProfileInfo />
            {/* </Paper> */}
          </Grid>
          <Grid item xs={9}>
            <Paper style={{ padding: "10px" }}>Cards</Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
