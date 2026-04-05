import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide">
          🎓 College Events
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          <Link to="/check-registration" className="hover:text-blue-200 transition">My Registrations</Link>
          <Link to="/admin/login" className="bg-white text-blue-700 px-4 py-1 rounded-full hover:bg-blue-100 transition">Admin</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 text-sm font-medium px-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-200 transition">Home</Link>
          <Link to="/check-registration" onClick={() => setIsOpen(false)} className="hover:text-blue-200 transition">My Registrations</Link>
          <Link to="/admin/login" onClick={() => setIsOpen(false)} className="bg-white text-blue-700 px-4 py-1 rounded-full hover:bg-blue-100 transition w-fit">Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;