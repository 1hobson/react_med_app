import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setIsLoggedIn(true);
      setUsername(storedName);
    }
  }, []);

  function handleClick() {
    const navLinks = document.querySelector('.nav__links');
    const navIcon = document.querySelector('.nav__icon i');
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      navIcon.classList.remove('fa-bars');
      navIcon.classList.add('fa-times');
    } else {
      navIcon.classList.remove('fa-times');
      navIcon.classList.add('fa-bars');
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">StayHealthy</Link>
          <span>.</span>
        </div>

        <div className="nav__icon" onClick={handleClick}>
          <i className="fa fa-times fa fa-bars"></i>
        </div>

        <ul className="nav__links active">
          <li className="link"><Link to="/"><button className="btn1">Home</button></Link></li>
          <li className="link"><Link to="/appointments"><button className="btn1">Appointments</button></Link></li>
          <li className="link"><Link to="/reviews"><button className="btn1">Reviews</button></Link></li>
          <li className="link"><Link to="/instant-consultation"><button className="btn1">Instant Consultation</button></Link></li>

          {isLoggedIn ? (
            <>
              <li className="link dropdown welcome-user">
                <button className="btn1" onClick={() => setShowDropdown(!showDropdown)}>
                  Welcome, {username} ▼
                </button>
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                  </ul>
                )}
              </li>
              <li className="link">
                <button className="btn2" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="link"><Link to="/signup"><button className="btn1">Sign Up</button></Link></li>
              <li className="link"><Link to="/login"><button className="btn1">Login</button></Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;