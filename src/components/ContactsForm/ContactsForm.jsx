import React, { useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import { Status } from 'helpers/status';

export default function ContactsForm({
  setIsContactsUpdate,
  setError,
  setStatus,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleCheckboxClick = e => {
    setIsChecked(!isChecked);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const submitData = {
      name,
      email,
      phone,
    };

    if (isChecked) {
      submitData.favorite = 'true';
    }
    console.log(submitData);

    PhoneBook.addContact(submitData)
      .then(data => {
        console.log(data);
        const { name } = data;
        alert(`Contact "${name}" added success.`);
        setStatus(Status.RESOLVED);
        setIsContactsUpdate(prev => !prev);
      })
      .catch(err => {
        setError(err.message);
        setStatus(Status.REJECTED);
      });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />{' '}
        <span>Email</span>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
        />{' '}
        <span>Phone</span>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleInputChange}
        />{' '}
        <span>Favorite</span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxClick}
        />
        <br />
        <br />
        <button type="submit">Add contact</button>
      </form>
      <hr />
      <br />
    </div>
  );
}
