import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children, appointmentData, canceledAppointment, setAppointmentData, setCanceledAppointment }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
  }, []);

  useEffect(() => {
    if (appointmentData) {
      setShowNotification(true);
    }
  }, [appointmentData]);

  useEffect(() => {
    if (canceledAppointment) {
      setShowNotification(false);
      if (typeof setCanceledAppointment === 'function') {
        setTimeout(() => setCanceledAppointment(false), 0);
      }
    }
  }, [canceledAppointment, setCanceledAppointment]);

  const handleCancelBooking = () => {
    if (setAppointmentData) setAppointmentData(null);

    if (appointmentData?.doctorName) {
      localStorage.removeItem(appointmentData.doctorName);
    }

    if (setCanceledAppointment) setCanceledAppointment(true);
  };

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>User:</strong> {username}
            </p>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {appointmentData?.doctorName || doctorData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData?.date || 'N/A'}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData?.time || 'N/A'}
            </p>
            <button
              type="button"
              className="appointment-card-cancel-btn"
              onClick={handleCancelBooking}
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
