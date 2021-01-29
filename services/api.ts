import axios from 'axios';

const baseURL = `/api`;

const api = axios.create({
  baseURL,
});

export default api;
