import React from "react";
import checkmail from "../../../../assets/img/checkemail.png";
import style from "./CheckEmail.module.css";

export const CheckEmail: React.FC = () => {
  return (
    <div className={style.checkEmail}>
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
