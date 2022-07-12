import React from "react";
import { useLocation } from "react-router-dom";
import checkmail from "../../assets/img/checkemail.png";
import style from "./CheckEmail.module.css";
import commonStyle from "../../assets/styles/Common.module.css";

export const CheckEmail: React.FC = () => {
  const { state } = useLocation();
  // @ts-ignore
  let email: string = state;

  return (
    <div className={style.checkEmail}>
      <h2 className={commonStyle.title}>Training cards</h2>
      <div
        className={style.image}
        style={{ backgroundImage: `url(${checkmail})` }}
      />
      <h3 className={commonStyle.subtitle}>Check Email</h3>
      <span
        className={`${commonStyle.description} ${commonStyle.bottomRedirect}`}
      >
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
