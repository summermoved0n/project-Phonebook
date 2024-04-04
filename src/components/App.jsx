import { useEffect, useState } from 'react';

import * as PhoneBookApi from '../helpers/api-services';

export default function App() {
  const [email, useEmail] = useState('sobara@mail.com');
  const [password, usePassword] = useState('123456');

  console.log(email);

  useEffect(() => {
    PhoneBookApi.userRegister(email, password)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });
  return <div>Helloo</div>;
}
