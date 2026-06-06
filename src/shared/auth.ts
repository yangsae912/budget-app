import axios from 'axios';

const SESSION_KEY = 'budget-auth';

async function validatePassword(password: string): Promise<boolean> {
  if (import.meta.env.VITE_APP_ENV === 'local') {
    return password === '1234';
  }
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/verify-password`,
    { password }
  );
  return res.data.success;
}

export async function login(password: string): Promise<boolean> {
  if (!await validatePassword(password)) return false;
  sessionStorage.setItem(SESSION_KEY, 'true');
  return true;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}
