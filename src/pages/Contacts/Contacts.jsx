import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
// import css from './Contacts.module.css';
import ContactsItem from 'components/ContactsItem/ContactsItem';
import ContactsForm from 'components/ContactsForm/ContactsForm';

export const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Contacts() {
  const [contactsUpdate, setContactsUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  useEffect(() => {
    setStatus(Status.PENDING);

    PhoneBook.getAllContacts()
      .then(data => {
        setContacts([...data]);
        window.localStorage.setItem('contacts', JSON.stringify(data));
        setContactsUpdate(false);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        console.log(err);
        setStatus(Status.REJECTED);
      });
  }, [contactsUpdate]);

  return (
    <>
      <ContactsForm
        setError={setError}
        setContactsUpdate={setContactsUpdate}
        setStatus={setStatus}
      />
      {status === Status.PENDING && <p>Loading...</p>}
      {status === Status.RESOLVED && !contactsUpdate && (
        <ContactsItem contacts={contacts} />
      )}
      {status === Status.REJECTED && <b>{error}</b>}
    </>
  );
}
