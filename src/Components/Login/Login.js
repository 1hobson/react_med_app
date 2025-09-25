import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Only redirect if auth-token exists
  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setError(null);

    // Phone validation if phone field is filled
    if (phone && !/^\d{10}$/.test(phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    // Email validation if email field is filled
    if (!phone && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!phone && !email) {
      setError('Please enter either your phone number or email.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, password }),
      });

      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        if (email) sessionStorage.setItem('email', email);
        if (phone) sessionStorage.setItem('phone', phone);

        // Extract username from email before redirect
        if (email) {
          const username = email.split('@')[0];
          sessionStorage.setItem('name', username);
        }

        navigate('/');
      } else {
        if (json.errors) {
          setError(json.errors.map(err => err.msg).join(', '));
        } else {
          setError(json.error);
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member?{' '}
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;