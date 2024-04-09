import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';
import * as PhoneBook from '../../helpers/api-services';

const modal = document.getElementById('modal');

export default function Modal({
  modalContact,
  setIsModalOpen,
  setIsContactsUpdate,
}) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    PhoneBook.getContactById(modalContact)
      .then(data => {
        setModalData(data);
      })
      .catch(err => console.log(err));
  }, [modalContact]);

  const handleChangeContact = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'email':
        setNewEmail(value);
        break;
      case 'phone':
        setNewPhone(value);
        break;
      default:
        return;
    }
  };

  const onFormSubmit = (e, id = _id) => {
    e.preventDefault();
    const updateData = {};

    if (newName.trim() !== '') {
      updateData.name = newName;
    }

    if (newEmail.trim() !== '') {
      updateData.email = newEmail;
    }

    if (newPhone.trim() !== '') {
      updateData.phone = newPhone;
    }

    PhoneBook.updateContact(id, updateData)
      .then(data => {
        setNewName('');
        setNewEmail('');
        setNewPhone('');
        setIsModalOpen(false);
        setIsContactsUpdate(prev => !prev);
      })
      .catch(err => console.log(err));
  };

  const { _id, name, email, phone } = modalData;

  return createPortal(
    <div className={css.modal_dropbox}>
      <div className={css.modal_content}>
        <button type="button" onClick={() => setIsModalOpen(false)}>
          X
        </button>
        <br />
        <br />
        <div>
          <h3>Old Name: {name}</h3>
          <p>Old Email: {email}</p>
          <p>Old Phone: {phone}</p>
        </div>
        <br />
        <br />
        <form onSubmit={onFormSubmit}>
          <span>New Name</span>{' '}
          <input
            type="text"
            name="name"
            value={newName}
            onChange={handleChangeContact}
          />
          <br />
          <span>New Email</span>{' '}
          <input
            type="text"
            name="email"
            value={newEmail}
            onChange={handleChangeContact}
          />
          <br />
          <span>New Phone</span>{' '}
          <input
            type="text"
            name="phone"
            value={newPhone}
            onChange={handleChangeContact}
          />
          <br />
          {newName || newEmail || newPhone ? (
            <button type="submit">Change</button>
          ) : (
            <button type="submit" disabled>
              Change
            </button>
          )}
        </form>
      </div>
    </div>,
    modal
  );
}
