import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/theme.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const path = location.pathname;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px', // top/bottom 10px, left/right 30px
      backgroundColor: '#1A1A1A',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      {/* Logo on the left */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ height: "60px", width: "auto" }} />
      </Link>

      {/* Auth Buttons on the right */}
      <div className="auth-buttons" style={{ display: 'flex', gap: '12px' }}>
        {!token && path !== '/login' && (
          <button className="button-gold" onClick={() => navigate('/login')}>Login</button>
        )}
        {!token && path !== '/register' && (
          <button className="button-gold" onClick={() => navigate('/register')}>Register</button>
        )}
        {token && (
          <button className="button-gold" onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
