import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import { Status } from '../../pages/Contacts/Contacts';

export default function ContactsForm({
  setContactsUpdate,
  setStatus,
  setError,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addContactData, setAddContactData] = useState(null);

  useEffect(() => {
    if (!addContactData) {
      return;
    }

    PhoneBook.addContact(addContactData)
      .then(data => {
        const { name } = data;
        alert(`New contacts "${name}" added success.`);
        setContactsUpdate(true);
        setAddContactData(null);
      })
      .catch(err => {
        setAddContactData(null);
        console.log(err);
        setError(err.message);
        setStatus(Status.REJECTED);
      });
  }, [addContactData, setContactsUpdate, setError, setStatus]);

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

  const onSubmitForm = e => {
    e.preventDefault();
    const submitData = {
      name,
      email,
      phone,
    };
    setAddContactData(submitData);
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
        />
        <span>Email</span>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <span>Phone</span>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleInputChange}
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
