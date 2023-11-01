import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const { get, post, put, delete: destroy } = apiClient;
export default apiClient;
