import React, { useState } from 'react';

export default function UserMenu() {
  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem('user'));
  });

  const { email, subscription } = user;

  const logoutOnClick = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('contacts');
  };

  return (
    <div>
      <span>
        {'🧙‍♂️ '} {email}
      </span>{' '}
      <p>Status: {subscription}</p>
      <button type="button" onClick={() => logoutOnClick()}>
        LogOut
      </button>
    </div>
  );
}
