import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../auth';

const NAV = [
  { to: '/', label: '대시보드' },
  { to: '/expenses', label: '지출' },
  { to: '/goals', label: '목표' },
];

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <span className="font-bold text-lg text-gray-800">가계부</span>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-gray-600">로그아웃</button>
      </header>

      {/* 페이지 콘텐츠 */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* 모바일 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden">
        {NAV.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex items-center justify-center py-3 text-sm transition-colors ${
                isActive ? 'text-blue-500 font-medium' : 'text-gray-400'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
