import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/api';

export async function userRegister(registerData) {
  const { data } = await axios.post('/users/register', registerData);
  console.log(data);
  return data;
}
