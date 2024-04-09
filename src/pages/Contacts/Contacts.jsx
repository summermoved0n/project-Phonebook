import React, { useEffect, useState } from 'react';

import * as PhoneBook from '../../helpers/api-services';
import { Status } from 'helpers/status';
// import css from './Contacts.module.css';
import ContactsItem from 'components/ContactsItem/ContactsItem';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import Modal from 'components/Modal/Modal';

export default function Contacts() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContact, setModalContact] = useState(null);
  const [isContactsUpdate, setIsContactsUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  // console.log(isModalOpen);
  useEffect(() => {
    setStatus(Status.PENDING);
    PhoneBook.getAllContacts()
      .then(data => {
        setContacts([...data]);
        window.localStorage.setItem('contacts', JSON.stringify(data));
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        setError(err.message);
        setStatus(Status.REJECTED);
      });
  }, [isContactsUpdate]);

  const removeContact = id => {
    PhoneBook.removeContactById(id)
      .then(data => {
        const { name } = data;
        alert(`Contact "${name}" deleted.`);
        setStatus(Status.RESOLVED);
        setIsContactsUpdate(prev => !prev);
      })
      .catch(err => {
        setError(err.message);
        setStatus(Status.REJECTED);
      });
  };

  return (
    <>
      <ContactsForm
        setIsContactsUpdate={setIsContactsUpdate}
        setError={setError}
        setStatus={setStatus}
      />
      {status === Status.PENDING && <p>Loading...</p>}
      {status === Status.RESOLVED && (
        <ContactsItem
          contacts={contacts}
          removeContact={removeContact}
          setIsModalOpen={setIsModalOpen}
          setModalContact={setModalContact}
        />
      )}
      {isModalOpen && (
        <Modal
          modalContact={modalContact}
          setIsModalOpen={setIsModalOpen}
          setIsContactsUpdate={setIsContactsUpdate}
        />
      )}
      {contacts.length === 0 && <b>You have not contacts yet.🤷‍♂️</b>}
      {status === Status.REJECTED && <b>{error}😥</b>}
    </>
  );
}
