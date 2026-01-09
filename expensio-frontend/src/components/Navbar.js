import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../styles/theme.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [token, setToken] = useState(localStorage.getItem('token'));

  // Listen to localStorage changes (e.g., after login/logout)
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Also update token if location changes (redirects after login)
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px',
      backgroundColor: '#1A1A1A',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ height: "60px", width: "auto" }} />
      </Link>

      <div className="auth-buttons" style={{ display: 'flex', gap: '12px' }}>
        {!token && path !== '/login' && (
          <button className="button-gold" onClick={() => navigate('/login')}>Login</button>
        )}
        {!token && path !== '/register' && (
          <button className="button-gold" onClick={() => navigate('/register')}>Register</button>
        )}
        {token && (
          <button className="button-gold" onClick={() => {
            localStorage.clear();
            setToken(null);
            navigate('/');
          }}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
