import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import css from './Contacts.module.css';
import ContactsItem from 'components/ContactsItem/ContactsItem';
import ContactsForm from 'components/ContactsForm/ContactsForm';

export default function Contacts() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  useEffect(() => {
    PhoneBook.getAllContacts()
      .then(data => {
        setContacts(data);
        localStorage.setItem('contacts', JSON.stringify(data));
      })

      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ContactsForm />
      <ContactsItem contacts={contacts} />
    </>
  );
}
