import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: '🏠 Home' },
    { to: '/quizzes', label: '📝 Quizzes' },
    { to: '/expected', label: '📚 Expected Q&A' },
    { to: '/exam-guide', label: '🎯 Exam Guide' },
    { to: '/chat', label: '💬 ChatBot' },
    { to: '/admin', label: '⚙️ Admin' },
  ];

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="text-2xl">🎓</span>
            <span>QuizMaster</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(l.to)
                    ? 'bg-white/20 text-white'
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/20 px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? 'bg-white/20 text-white'
                  : 'text-indigo-100 hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
