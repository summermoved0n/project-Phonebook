import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';

export default function ContactsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addContactData, setAddContactData] = useState(null);

  useEffect(() => {
    if (!addContactData) {
      return;
    }

    PhoneBook.addContact(addContactData)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, [addContactData]);

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
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        Email
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        Phone
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
