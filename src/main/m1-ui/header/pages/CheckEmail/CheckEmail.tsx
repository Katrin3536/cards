import { LinearProgress } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../m2-bll/store";
import checkmail from "../../../../assets/img/checkemail.png";
import style from "./CheckEmail.module.css";

export const CheckEmail: React.FC = () => {
  const status = useAppSelector((state) => state.app.status);
  return (
    <div className={style.checkEmail}>
      {status === "loading" && <LinearProgress />}
      <h3 className={style.title}>it-incubator</h3>
      <div
        className={style.image}
        style={{ backgroundImage: `url(${checkmail})` }}
      />
      <h3 className={style.subtitle}>Check Email</h3>
      <span className={style.description}>
        We've sent an Email with instructions to example@mail.com
      </span>
    </div>
  );
};
