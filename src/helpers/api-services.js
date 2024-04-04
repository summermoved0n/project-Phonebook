import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/api';

export async function userRegister(email, password) {
  const postData = {
    email,
    password,
  };
  const { data } = await axios.post('/user/register', postData);
  console.log(data);
  return data;
}
