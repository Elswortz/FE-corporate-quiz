import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const refreshApi = axios.create({
  baseURL: 'http://localhost:8000',
});
