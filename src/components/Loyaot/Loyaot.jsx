import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Loyaot.module.css';

export default function Loyaot() {
  return (
    <>
      <header>
        <nav className={css.loyaot_navigation}>
          <NavLink className={css.page_link} to="/">
            Home
          </NavLink>
          <NavLink className={css.page_link} to="/contacts">
            Contacts
          </NavLink>
          <NavLink className={css.page_link} to="/register">
            Register
          </NavLink>
          <NavLink className={css.page_link} to="/login">
            LogIn
          </NavLink>
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
