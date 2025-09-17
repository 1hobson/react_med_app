import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  // State variables for email, phone, password
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ Phone validation if phone field is filled
    if (phone && !/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // ✅ Email validation if email field is filled
    if (!phone && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phone && !email) {
      setError("Please enter either your phone number or email.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password }),
      });

      const json = await res.json();
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        if (phone) sessionStorage.setItem('phone', phone);
        if (email) sessionStorage.setItem('email', email);

        navigate('/');
        window.location.reload();
      } else {
        if (json.errors) {
          for (const err of json.errors) {
            setError(err.msg);
          }
        } else {
          setError(json.error);
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member?{" "}
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={login}>

            {/* Email field */}
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
                aria-describedby="helpId"
              />
            </div>

            {/* Phone field */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your 10-digit phone number"
                maxLength={10}
                pattern="\d{10}"
                title="Please enter exactly 10 digits"
                aria-describedby="helpId"
              />
            </div>

            {/* Password field */}
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
                aria-describedby="helpId"
              />
            </div>

            {/* Error message display */}
            {error && (
              <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
                {error}
              </div>
            )}

            {/* Submit button */}
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
