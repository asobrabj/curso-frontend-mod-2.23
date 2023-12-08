import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://v6.exchangerate-api.com/v6/6382f080f1162041a0b0db6d/pair/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
