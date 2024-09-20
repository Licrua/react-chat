import { errorOnRequest } from '@utils/toast/notify';
import axios from 'axios';

async function newUser(login, pass) {
  try {
    const request = await axios.post('/api/v1/signup', {
      username: login,
      password: pass,
    });
    console.log('request', request);
    const user = {
      id: Date.now(),
      username: request.data.username,
    };
    console.log('username', user);

    // const prevResult = localStorage.getItem('username') || [];
    const existingUsers = JSON.parse(localStorage.getItem('username')) || [];

    // Добавляем нового пользователя в массив
    const updatedUsers = [...existingUsers, newUser];

    // Сохраняем обновленный массив пользователей в localStorage
    localStorage.setItem('username', JSON.stringify(updatedUsers));
    localStorage.setItem('token', request.data.token);

    return request.data; // Возвращаем данные из ответа, если запрос выполнен успешно
  } catch (error) {
    if (error.response && error.response.status === 409) {
      errorOnRequest();
      // Можно выполнить дополнительные действия в случае конфликта, например, обновить UI или предложить пользователю выбрать другое имя
    } else {
      console.log(
        'An error occurred while creating a new user:',
        error.message,
      );
      // Обработка других видов ошибок, например, сетевых проблем или ошибок сервера
    }
    throw error; // Повторное возбуждение ошибки для обработки её в других частях кода
  }
}

export default newUser;
