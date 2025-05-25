export async function login(email: string, password: string) {
  const res = await fetch('/rest/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch (err) {
    // ignore json parse errors
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Login failed');
  }

  return data;
}
