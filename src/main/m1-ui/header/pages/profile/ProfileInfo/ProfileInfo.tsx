import React, { useCallback } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../../../m2-bll/store";
import { logoutTC } from "../../../../../m2-bll/reducers/auth-reducer";
import { EditableSpan } from "../../../../../common/c5-EditableSpan/EditableSpan";
import {
  updateUserAvatarTC,
  updateUserNameTC,
} from "../../../../../m2-bll/reducers/profile-reducer";
import defaultImage from "../../../../../assets/img/def-avatar.png";
import classes from "./ProfileInfo.module.css";

const Input = styled("input")({
  display: "none",
});

export const ProfileInfo: React.FC = () => {
  const { name, avatar, email, publicCardPacksCount } = useAppSelector(
    (state) => state.profile
  );

  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  const onChangeValueHandler = (newName: string) => {
    dispatch(updateUserNameTC(newName));
  };

  // @ts-ignore
  const encodeImageFileAsURL = ({ target }: any) => {
    console.log(target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);

    fileReader.onloadend = function () {
      console.log("RESULT", fileReader.result);
      dispatch(updateUserAvatarTC(fileReader.result));
    };
  };

  const finalAva = { backgroundImage: `url(${avatar ? avatar : defaultImage}` };

  return (
    <div className={classes.wrapper}>
      <div className={classes.userAvatar} style={finalAva}></div>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={encodeImageFileAsURL}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <LogoutIcon onClick={logoutHandler} className={classes.logoutBtn} />
      <div className={classes.userInfo}>
        <div className={classes.userName}>
          <EditableSpan value={name} onChange={onChangeValueHandler} />
        </div>
        <p>email: {email}</p>
        <span className={classes.numberCards}>
          Cards: {publicCardPacksCount}
        </span>
      </div>
    </div>
  );
};

// profileImage ? profileImage :
