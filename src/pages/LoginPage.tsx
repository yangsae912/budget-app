import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../shared/auth';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      navigate('/', { replace: true });
    } else {
      setError(true);
      setPassword('');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">가계부</h1>
        <p className="text-sm text-gray-400 mb-6">비밀번호를 입력하세요</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="비밀번호"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
              error
                ? 'border-red-400 bg-red-50 focus:border-red-400'
                : 'border-gray-200 focus:border-blue-400'
            }`}
          />
          {error && (
            <p className="text-xs text-red-500">비밀번호가 틀렸어요.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {loading ? '확인 중...' : '입력'}
          </button>
        </form>
      </div>
    </div>
  );
}
