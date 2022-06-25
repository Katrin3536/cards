import React from "react";
import { Grid, Paper } from "@mui/material";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import style from "./Profile.module.css";

const Profile: React.FC = () => {
  return (
    <div className={style.profile}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <ProfileInfo />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper style={{ padding: "10px" }}>Cards</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
