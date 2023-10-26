import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/rest',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const { get, post, put, delete: destroy } = apiClient;
export default apiClient;
