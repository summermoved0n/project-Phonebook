import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Loyaot.module.css';
import UserMenu from 'components/UserMenu/UserMenu';

export default function Loyaot() {
  // const [updateFlag, setUpdateFlag] = useState(false);
  const [isLogedIn] = useState(() => {
    return JSON.parse(localStorage.getItem('isLoggedIn'));
  });
  console.log(isLogedIn);
  return (
    <>
      <header>
        <nav className={css.loyaot_navigation}>
          <NavLink className={css.page_link} to="/">
            Home
          </NavLink>

          {isLogedIn ? (
            <div className={css.nav_login_conteiner}>
              <NavLink className={css.page_link} to="/contacts">
                Contacts
              </NavLink>
              <UserMenu />
            </div>
          ) : (
            <div className={css.nav_logout_conteiner}>
              <NavLink className={css.page_link} to="/register">
                Register
              </NavLink>
              <NavLink className={css.page_link} to="/login">
                LogIn
              </NavLink>
            </div>
          )}
        </nav>
      </header>
      <hr />
      <br />
      <main>
        <Outlet />
      </main>
    </>
  );
}
