import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import css from './Contacts.module.css';
import ContactsItem from 'components/ContactsItem/ContactsItem';

export default function Contacts() {
  const [contacts, setContacts] = useState(
    localStorage.getItem('contacts') ?? []
  );

  useEffect(() => {
    PhoneBook.getAllContacts()
      .then(data => setContacts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ContactsItem contacts={contacts} />
    </>
  );
}
