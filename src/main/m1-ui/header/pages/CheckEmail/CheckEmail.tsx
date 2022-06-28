import React from "react";
import { useLocation } from "react-router-dom";
import checkmail from "../../../../assets/img/checkemail.png";
import style from "./CheckEmail.module.css";

export const CheckEmail: React.FC = () => {
  const { state } = useLocation();

  // @ts-ignore
  let email: string = state;

  return (
    <div className={style.checkEmail}>
      <h3 className={style.title}>it-incubator</h3>
      <div
        className={style.image}
        style={{ backgroundImage: `url(${checkmail})` }}
      />
      <h3 className={style.subtitle}>Check Email</h3>
      <span className={style.description}>
        We've sent an Email with instructions to
        <a href={`https://${email}`} target="blanc">
          <span style={{ color: "blue" }}>
            {email ? " " + email : " example@google.com"}
          </span>
        </a>
      </span>
    </div>
  );
};
