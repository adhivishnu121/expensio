import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/theme.css';
import { toast } from 'react-toastify';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://expensio-production.up.railway.app/api/users/register', {
      firstName,
      lastName,
      phone,
      email,
      password
    })
    .then(response => {
      toast.success(`Registration Successful!\nPlease Login first!`);
      navigate('/login');
    })
    .catch(error => {
      // Fix for [object Object] issue
      const msg = error.response?.data?.error || error.message;
      toast.error(`Registration Failed: ${msg}`);
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2 className="gold login-title">Register</h2>

        <div className="form-group">
          <label className="form-label">First Name:</label>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name:</label>
          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input
            className="form-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

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

        <button className="button-gold login-btn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
