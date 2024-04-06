import React from 'react';

import css from './ContactsItem.module.css';

export default function ContactsItem({ contacts }) {
  console.log(contacts);
  return (
    <ul className={css.contact_list}>
      {contacts.map(({ _id, name, email, phone }) => (
        <li key={_id} id={_id}>
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{phone}</p>
        </li>
      ))}
    </ul>
  );
}
