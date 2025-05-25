
export interface Credentials {
  email: string;
  password: string;
}

export async function login(credentials: Credentials) {
  const response = await fetch('/rest/auth/login', {
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


