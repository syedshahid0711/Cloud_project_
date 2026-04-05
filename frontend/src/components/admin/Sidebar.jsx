import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const links = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/events', label: 'Events', icon: '📅' },
    { path: '/admin/registrations', label: 'Registrations', icon: '👥' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-blue-800 text-white px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">🎓 College Events</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-12 left-0 right-0 z-40 bg-blue-800 text-white p-4 space-y-2">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                ${location.pathname === link.path
                  ? 'bg-white text-blue-800'
                  : 'text-blue-100 hover:bg-blue-700'
                }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-100 hover:bg-blue-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-blue-800 min-h-screen text-white flex-col flex-shrink-0">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-xl font-bold">🎓 College Events</h1>
          <p className="text-blue-300 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                ${location.pathname === link.path
                  ? 'bg-white text-blue-800'
                  : 'text-blue-100 hover:bg-blue-700'
                }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-100 hover:bg-blue-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;