import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/api';

export async function userRegister(registerData) {
  const { data } = await axios.post('/users/register', registerData);
  return data;
}

export async function userLogin(loginData) {
  const { data } = await axios.post('/users/login', loginData);
  const { token } = data;
  console.log(token);
  if (token) {
    window.localStorage.setItem('token', JSON.stringify(token));
    window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
  } else {
    window.localStorage.setItem('isLoggedIn', JSON.stringify(false));
  }

  return data;
}

export async function getAllContacts() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axios.get('/contacts');

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(contactData) {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axios.post('/contacts', contactData);

    return data;
  } catch (error) {
    throw error;
  }
}
