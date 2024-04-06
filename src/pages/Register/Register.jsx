import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import css from './Register.module.css';

export default function Register() {
  const [registerData, setRegisterData] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!registerData) {
      return;
    }

    PhoneBook.userRegister(registerData)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, [registerData]);

  const onInputChange = e => {
    const { name, value } = e.target;
    console.log();
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

  const onFormSubmit = e => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    setRegisterData(formData);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <form className={css.register_form} onSubmit={onFormSubmit}>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        <br />
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
