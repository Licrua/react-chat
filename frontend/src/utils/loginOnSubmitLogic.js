const { default: axios } = require('axios');
const { errorOnRequest } = require('./toast/notify');

async function authorizeUser({ values }) {
  try {
    const userData = await axios.post('/api/v1/login', {
      username: values.username,
      password: values.password,
    });
    localStorage.setItem('token', userData.data.token);
    localStorage.setItem('username', userData.data.username);
  } catch (e) {
    errorOnRequest();
    console.error(e, 'error');
  }
}

export default authorizeUser;
