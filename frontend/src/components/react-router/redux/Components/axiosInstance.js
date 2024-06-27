import axios from 'axios';
import { errorOnRequest } from '../../../../toast/notify';

// Определите функцию errorOnRequest для обработки ошибок
const errorOnRequest = (message) => {
  alert(message); // Используйте alert или любую другую реализацию уведомления об ошибке
};

// Создаем экземпляр Axios
const axiosInstance = axios.create();

// Добавляем интерсептор запросов
axiosInstance.interceptors.request.use(
  config => {
    if (!navigator.onLine) {
      throw new Error('Network is offline');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Добавляем интерсептор ответов
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!navigator.onLine) {
      errorOnRequest('No network connection');
    } else if (error.code === 'ERR_NETWORK') {
      errorOnRequest('Network error');
    } else {
      console.error('Error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


