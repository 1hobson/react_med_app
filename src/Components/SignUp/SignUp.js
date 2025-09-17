import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setShowerr("");

    if (!/^\d{10}$/.test(phone)) {
      setShowerr("Phone number must be exactly 10 digits.");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone }),
    });

    const json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg);
        }
      } else {
        setShowerr(json.error);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            
            {/* Name field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                aria-describedby="helpId"
              />
            </div>

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
                aria-describedby="helpId"
                maxLength={10}
                pattern="\d{10}"
                title="Please enter exactly 10 digits"
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
            {showerr && (
              <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
                {showerr}
              </div>
            )}

            {/* Submit button */}
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;