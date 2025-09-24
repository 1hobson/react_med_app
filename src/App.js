import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';  
import Appointments from './Components/Appointments/Appointments';  
import Notification from './Components/Appointments/Notification/Notification';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Notification>
        <Navbar />
            <Routes>
            <Route path="/" element={<LandingPage />} />            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;