import axios from 'axios';
import leoProfanity from 'leo-profanity';
import { errorOnRequest } from './toast/notify';

export async function getChannel(token) {
  try {
    const request = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.data;
    localStorage.setItem('channels', JSON.stringify(data));
    return request.data;
  } catch (error) {
    console.error('Error getting channels:', error);
    errorOnRequest();
    throw error; // Повторное возбуждение ошибки для обработки её в других частях кода
  }
}

export async function loginUser(log, pass) {
  try {
    const request = await axios.post('/api/v1/login', {
      username: log,
      password: pass,
    });
    return request.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    errorOnRequest();
    throw error;
  }
}

export async function newUser(login, pass) {
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
    const prevResult = JSON.parse(localStorage.getItem('username')) || [];
    console.log('prevResult');
    localStorage.setItem('token', request.data.token);
    localStorage.setItem('username', JSON.stringify([...prevResult, user]));
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

export async function addSomeChannel(token, obj) {
  try {
    const request = await axios.post('/api/v1/channels', obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.data;
  } catch (error) {
    errorOnRequest();
    console.error('Error adding channel:', error);
    throw error;
  }
}

export async function getMessage(token) {
  try {
    const request = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.data;
  } catch (error) {
    errorOnRequest();
    console.error('Error getting messages:', error);
    throw error;
  }
}

export async function checkRender() {
  try {
    const request = await axios.post(
      'https://js-react-developer-project-12-8.onrender.com/api/v1/signup',
    );
    return request;
  } catch (error) {
    errorOnRequest();
    console.error('Error checking render:', error);
    throw error;
  }
}

export async function addMessageValue(newMessage, token) {
  try {
    const value = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return value.data;
  } catch (error) {
    errorOnRequest();
    console.error('Error adding message:', error);
    throw error;
  }
}

export async function removeChannel(id, token) {
  try {
    const request = await axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(request);
  } catch (error) {
    console.error('Error removing channel:', error);
    errorOnRequest();
    throw error;
  }
}

export async function editChannel(id, token, value) {
  try {
    const editedChannel = { name: leoProfanity.clean(value) };
    const data = await axios.patch(`/api/v1/channels/${id}`, editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  } catch (error) {
    errorOnRequest();
    console.error('Error editing channel:', error);
    throw error;
  }
}
