import axios from "axios";


export async function getChannel(token) {
    const request = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.data
     localStorage.setItem('channels', JSON.stringify(data))
    console.log('STORAGE', localStorage.getItem('channels'));
    return request.data
  }


  export async function loginUser() {
    const request = axios.post('/api/v1/login', { username: 'vano_stephano', password: 'vano_stephano' })
    console.log(request);
    return request.data
  }




  export async function newUser() {
    try {
      const request = await axios.post('/api/v1/signup', { username: 'vano_stephano', password: 'vano_stephano' });
      console.log('newUserADD', request);
      return request.data; // Возвращаем данные из ответа, если запрос выполнен успешно
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log('User with this username already exists');
        // Можно выполнить дополнительные действия в случае конфликта, например, обновить UI или предложить пользователю выбрать другое имя
      } else {
        console.log('An error occurred while creating a new user:', error.message);
        // Обработка других видов ошибок, например, сетевых проблем или ошибок сервера
      }
      throw error; // Повторное возбуждение ошибки для обработки её в других частях кода
    }
  }
  


  export async function addChannel(token, obj) {
    const request = await axios.get('/api/v1/channels', obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('request', request);
    return request
  }

  export async function getMessage(token) {
    const request = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return  request
  }
