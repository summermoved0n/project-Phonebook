import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import css from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    if (!loginData) {
      return;
    }

    PhoneBook.userLogin(loginData)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, [loginData]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    setLoginData(data);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
