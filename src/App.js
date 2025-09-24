import React, { useState } from 'react';
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
  const [appointmentData, setAppointmentData] = useState(null);
    <Notification appointmentData={appointmentData} />
    {console.log('Appointment Data:', appointmentData)}
  return (
    <div className="app">
      <BrowserRouter>
        {/* Notification listens to appointmentData changes */}
        <Notification appointmentData={appointmentData} />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />            
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments setAppointmentData={setAppointmentData} />} />
          <Route path="/instant-consultation" element={<InstantConsultation setAppointmentData={setAppointmentData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
