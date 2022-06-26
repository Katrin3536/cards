import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import defaultImage from "../../../../../assets/img/def-avatar.png";
import classes from "./ProfileInfo.module.css";
import { useAppDispatch } from "../../../../../m2-bll/store";
import { logoutTC } from "../../../../../m2-bll/reducers/auth-reducer";

// type ProfilePhotoPropsType = {
//   profileImage: string;
//   name: string;
//   email: string;
//   cardsNum: number;
// };

export const ProfileInfo: React.FC = () => {
  // const profileImage = useSelector((state) => state);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.userAvatar}>
        <div>
          <img src={`${defaultImage}`} alt="avatar"></img>
        </div>
        <LogoutIcon onClick={logoutHandler} className={classes.logoutBtn} />
      </div>
      <div>
        <ul className={classes.userList}>
          <li className={classes.userItem}>Name:{}</li>
          <li className={classes.userItem}>Email:{}</li>
          <li className={classes.userItem}>Number of cards:{}</li>
        </ul>
      </div>
    </div>
  );
};

// profileImage ? profileImage :
