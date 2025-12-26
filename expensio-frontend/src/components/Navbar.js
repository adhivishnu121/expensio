import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
      padding: '15px',
      backgroundColor: '#1A1A1A'
    }}>
      <h2 className="gold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
<div className="logo-container">
      <Link to="/">
<img src="/logo.png" alt="Logo" style={{ height: "60px", width: "150px" }} />
      </Link>
    </div>      </h2>
      <div>
<div class="auth-buttons">
    {!token && path !== '/login' && <button className="button-gold"onClick={() => navigate('/login')}>Login</button>}
    {!token && path !== '/register' && <button className="button-gold"onClick={() => navigate('/register')}>Register</button>}
    {token && <button className='button-gold ' onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</button>}
  </div>
      </div>
    </nav>
  );
}

export default Navbar;
