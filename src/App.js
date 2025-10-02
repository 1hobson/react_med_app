import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';  
import Appointments from './Components/Appointments/Appointments';  
import Notification from './Components/Notification/Notification';
import Reviews from './Components/Reviews/Reviews'

function App() {
  const [appointmentData, setAppointmentData] = useState(null);
  const [canceledAppointment, setCanceledAppointment] = useState(false);

  const handleNotificationCancel = (doctorName) => {
    localStorage.removeItem(doctorName);
    localStorage.removeItem('doctorData');
    setAppointmentData(null);
    setCanceledAppointment(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Notification
        appointmentData={appointmentData}
        canceledAppointment={canceledAppointment}
        setCanceledAppointment={setCanceledAppointment}
        onCancel={handleNotificationCancel}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/appointments" element={<Appointments setAppointmentData={setAppointmentData} setCanceledAppointment={setCanceledAppointment} />} />
            <Route path="/instant-consultation" element={<InstantConsultation setAppointmentData={setAppointmentData} setCanceledAppointment={setCanceledAppointment} />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;