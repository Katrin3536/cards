import React, { useCallback } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import defaultImage from "../../../../../assets/img/def-avatar.png";
import classes from "./ProfileInfo.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../m2-bll/store";
import { logoutTC } from "../../../../../m2-bll/reducers/auth-reducer";
import { EditableSpan } from "../../../../../common/c5-EditableSpan/EditableSpan";
import { updateUserNameTC } from "../../../../../m2-bll/reducers/profile-reducer";

export const ProfileInfo: React.FC = () => {
  const { name, email, publicCardPacksCount } = useAppSelector(
    (state) => state.profile
  );

  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  const onChangeValueHandler = (newName: string) => {
    dispatch(updateUserNameTC(newName));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.userAvatar}>
        <img src={`${defaultImage}`} alt="avatar"></img>
      </div>
      <LogoutIcon onClick={logoutHandler} className={classes.logoutBtn} />
      <div>
        <EditableSpan value={name} onChange={onChangeValueHandler} />
        <p className={classes.userItem}>email: {email}</p>
        <span className={classes.numberCards}>
          Cards: {publicCardPacksCount}
        </span>
      </div>
    </div>
  );
};

// profileImage ? profileImage :
