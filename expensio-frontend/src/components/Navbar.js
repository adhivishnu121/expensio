import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/theme.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // get current path
const token = localStorage.getItem('token');
const path = location.pathname;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: '#1A1A1A'
    }}>
      <h2 className="gold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        Expensio
      </h2>
      <div>
        <div>
    {!token && path !== '/login' && <button className="button-gold"onClick={() => navigate('/login')}>Login</button>}
    {!token && path !== '/register' && <button className="button-gold"onClick={() => navigate('/register')}>Register</button>}
    {token && <button onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</button>}
  </div>
      </div>
    </nav>
  );
}

export default Navbar;
