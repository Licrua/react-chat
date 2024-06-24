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


  export async function loginUser(log,pass) {
    const request = axios.post('/api/v1/login', { username: log, password: pass })
    console.log('loginUser', request);
    // localStorage.setItem('token', request.data.token)
    // localStorage.setItem('username', request.data.username)
    return request.data
  }




  export async function newUser(login, pass) {
    try {
      const request = await axios.post('/api/v1/signup', { username: login, password: pass });
      console.log('newUserADD', request);
      localStorage.setItem('token', request.data.token)
      localStorage.setItem('username', request.data.username)
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
  


  export async function addSomeChannel(token, obj) {
    const request = await axios.post('/api/v1/channels', obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('request', request.data);
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

  export async function checkRender() {
    const request = await axios.post('https://js-react-developer-project-12-8.onrender.com/api/v1/signup')
    console.log('checkRender', request);
 return request
  }


  export async function addMessageValue(newMessage, token) {
    const value = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('addMessageValue', value.data);
    return value.data
  }
export async function removeChannel(id, token) {
  const request = await axios.delete(`/api/v1/channels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log('removeChannel', request);
}

export async function editChannel(id, token, value) {
  const editedChannel = { name: value};
const data = await axios.patch(`/api/v1/channels/${id}`, editedChannel, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
)
console.log('editChannelData', data);
}