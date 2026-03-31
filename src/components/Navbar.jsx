import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, BarChart2, User, Home, GraduationCap, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { state } = useApp();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <span className="logo-icon">E</span>
          <span className="logo-text">Edura</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/discovery" className={`nav-link ${isActive('/discovery') || isActive('/opportunity') ? 'active' : ''}`}>
            <GraduationCap size={18} />
            <span>Explore</span>
          </Link>
          <Link to="/educators" className={`nav-link ${isActive('/educators') ? 'active' : ''}`}>
            <Users size={18} />
            <span>Educators</span>
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <Bookmark size={18} />
            <span>My Path</span>
            {state.bookmarks.length > 0 && (
              <span className="badge-count">{state.bookmarks.length}</span>
            )}
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/discovery" className="search-trigger glass">
            <Search size={18} />
            <span className="search-meta">Search...</span>
            <span className="kbd">⌘K</span>
          </Link>
          <div className="profile-trigger">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
}
