import axios from 'axios';
import { errorOnRequest } from './toast/notify';

async function loginOnSubmitLogic(values) {
  try {
    // Отправляем запрос к API для авторизации
    const response = await axios.post('/api/v1/login', {
      username: values?.username,
      password: values?.password,
    });

    console.log('loginResponse', response);

    // Проверяем, что сервер вернул токен и имя пользователя
    if (response.data && response.data.token && response.data.username) {
      console.log('User authorized successfully');

      // Сохраняем токен и имя пользователя в localStorage
      //   localStorage.setItem('token', response.data.token);
      //   localStorage.setItem('username', response.data.usernamfe);
    } else {
      throw new Error('Invalid response from server'); // Обработка неправильного ответа
    }
  } catch (error) {
    console.error('Login request failed:', error);
    errorOnRequest(); // Вызов функции обработки ошибки (если она используется)
  }
}

export default loginOnSubmitLogic;
