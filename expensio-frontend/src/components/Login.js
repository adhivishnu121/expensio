import React, { useState } from 'react';
import axios from 'axios';
import '../styles/theme.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/users/login', { email, password })
  .then(response => {
    const data = response.data;
localStorage.setItem("token", response.data.token);
localStorage.setItem("email", response.data.email);
    localStorage.setItem('firstName', data.firstName);
    alert(`Login Successful!\nWelcome ${data.firstName}`);
    navigate('/Dashboard');
  })

.catch(error => {
  if (error.response) {
    // Show the backend error message
    const errMsg = error.response.data.error || JSON.stringify(error.response.data);
    alert(`Login Failed: ${errMsg}`);
  } else {
    alert(`Error: ${error.message}`);
  }
});

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="gold login-title">Login</h2>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="button-gold login-btn" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
