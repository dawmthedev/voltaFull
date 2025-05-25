
export interface Credentials {
  email: string;
  password: string;
}

import { baseURL } from '../apiConfig';

export async function login(credentials: Credentials) {
  const response = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
}


