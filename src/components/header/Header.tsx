import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../common/routes/RoutesConstants";
import cardsIcon from "../../assets/img/cardsIcon.png";
import profileIcon from "../../assets/img/profileIcon.png";
import style from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1 className={style.title}>Training cards</h1>
        <nav className={style.nav_list}>
          {/* //изменить на packs */}

          <NavLink
            to={PATH.CARDS_LIST}
            className={({ isActive }) =>
              style.link + " " + (isActive ? style.active : "")
            }
          >
            {/* <div
            style={{
              backgroundColor: `url(${cardsIcon})}`,
            }}
          /> */}
            <img src={cardsIcon} className={style.icon} alt="card-icon" />
            Packs list
          </NavLink>

          <NavLink
            to={PATH.PROFILE}
            className={({ isActive }) =>
              style.link + " " + (isActive ? style.active : "")
            }
          >
            <img src={profileIcon} className={style.icon} alt="card-icon" />
            Profile
          </NavLink>

          {/*    <NavLink to={PATH.LOGIN}>Login</NavLink> 
        <NavLink to={PATH.PASSWORD_RECOVERING}>Password_recovering</NavLink>
        <NavLink to={PATH.NEW_PASSWORD}>New_password</NavLink> */}
        </nav>
      </div>
    </header>
  );
};
