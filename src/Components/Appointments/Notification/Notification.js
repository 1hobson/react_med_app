import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children, appointmentData }) => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Load username and doctor info on mount
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    if (storedUsername) setIsLoggedIn(true);
    setUsername(storedUsername || "");

    if (storedDoctorData) setDoctorData(storedDoctorData);
  }, []);

  // React to changes in appointmentData
  useEffect(() => {
    if (appointmentData) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [appointmentData]);

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Confirmed</h3>
            <p className="appointment-card__message">
              <strong>User:</strong> {username}
            </p>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {appointmentData.doctorName || doctorData?.name}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData.appointmentDate}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData.selectedSlot}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;