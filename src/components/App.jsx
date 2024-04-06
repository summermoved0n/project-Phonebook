import { Route, Routes } from 'react-router-dom';

import Loyaot from './Loyaot/Loyaot';
import Register from '../pages/Register/Register';
import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Contacts from 'pages/Contacts/Contacts';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Loyaot />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
}
