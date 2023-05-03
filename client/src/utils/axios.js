import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fullstack-posts-app.vercel.app/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
}); //добавление в каждый запрос токена в хедерс

export default instance;
