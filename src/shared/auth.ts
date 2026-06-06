const SESSION_KEY = 'budget-auth';

// TODO: 서버 연동 시 이 함수를 API 호출로 교체
function validatePassword(password: string): boolean {
  return password === '1234';
}

export function login(password: string): boolean {
  if (!validatePassword(password)) return false;
  sessionStorage.setItem(SESSION_KEY, 'true');
  return true;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}
