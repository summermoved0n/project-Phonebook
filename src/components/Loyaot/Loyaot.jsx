import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Loyaot() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">LogIn</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
