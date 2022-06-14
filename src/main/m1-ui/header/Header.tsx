import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/RoutesConstants';
import style from './Header.module.css';

function Header() {
    return (
        <div>
            <nav className={style.navlink_list}>
                <NavLink to={PATH.LOGIN}>Login</NavLink>
                <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                <NavLink to={PATH.PROFILE}>Profile</NavLink>
                <NavLink to={PATH.ERROR404}>Error_404</NavLink>
                <NavLink to={PATH.PASSWORD_RECOVERING}>Password_recovering</NavLink>
                <NavLink to={PATH.NEW_PASSWORD}>New_password</NavLink>
                <NavLink to={PATH.TEST_PAGE}>Test_page</NavLink>
            </nav>
        </div>
    );
}

export default Header;
