import axios from 'axios';
import { urls } from '../../apiConfig';

const env = process.env.REACT_APP_STAGE || 'local';
export const baseURL = urls[env];

const apiClient = axios.create({
  baseURL: baseURL || 'https://recrm-dd33eadabf10.herokuapp.com/rest',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const { get, post, put, delete: destroy } = apiClient;
export default apiClient;
