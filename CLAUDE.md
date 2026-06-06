# budget-app

React + TypeScript + Vite 가계부 앱. 프론트 단독 개발 중, 추후 백엔드 연결 예정.

## 스택

- React 18 + TypeScript + Vite 5
- Tailwind CSS 3
- React Router v6
- Zustand, Recharts, Axios, xlsx

## 백엔드 연결 시 해야 할 작업

### 1. 인증 (auth)

**파일:** `src/shared/auth.ts`

현재 `validatePassword()` 함수에 비밀번호 `1234`가 하드코딩되어 있음.
서버 연결 시 이 함수를 API 호출로 교체:

```ts
// 현재
function validatePassword(password: string): boolean {
  return password === '1234';
}

// 교체 예시
async function validatePassword(password: string): Promise<boolean> {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-password`, { password });
  return res.data.success;
}
```

- `login()` 함수의 sessionStorage 저장 방식은 유지하거나 서버 토큰 방식으로 변경
- `LoginPage.tsx` UI는 그대로 재사용 가능

### 2. 환경변수

`.env` 파일 생성 후 API URL 설정:

```
VITE_API_URL=https://your-api-server.com
```

### 3. 서비스 레이어

- `src/services/expenseService.ts` — mock 제거 후 실제 API 연결
- `src/services/goalService.ts` — mock 제거 후 실제 API 연결
