import React from 'react';

import css from './ContactsItem.module.css';

export default function ContactsItem({
  contacts,
  removeContact,
  setIsModalOpen,
  setModalContact,
}) {
  return (
    <ul className={css.contact_list}>
      {contacts.map(({ _id, name, email, phone, favorite }) => (
        <li
          className={css.contact_item}
          style={{
            backgroundColor: favorite ? 'tan' : 'transparent',
          }}
          key={_id}
          id={_id}
        >
          <span>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{phone}</p>
          </span>
          <span>{favorite && '❤'}</span>
          <span>
            <button
              type="button"
              onClick={() => {
                setModalContact(_id);
                setIsModalOpen(true);
              }}
            >
              Update
            </button>{' '}
            <button type="button" onClick={() => removeContact(_id)}>
              Delete
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
}
