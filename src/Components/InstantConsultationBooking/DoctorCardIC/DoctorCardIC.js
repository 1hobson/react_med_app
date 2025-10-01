import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, setAppointmentData }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => setShowModal(true);

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((a) => a.id !== appointmentId);
    setAppointments(updatedAppointments);

    if (updatedAppointments.length === 0 && setAppointmentData) setAppointmentData(null);

    localStorage.removeItem(name);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };

    setAppointments([...appointments, newAppointment]);
    setShowModal(false);

    if (setAppointmentData) {
      setAppointmentData(newAppointment);
    }

    localStorage.setItem(name, JSON.stringify(newAppointment));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
            <button
            type="button"
            className={appointments.length > 0 ? 'book-appointment-btn cancel-appointment-btn' : 'book-appointment-btn'}
            onClick={handleBooking}
            >
            {appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}
            </button>
      </div>

      <Popup
        modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeOnDocumentClick
        contentStyle={{
          width: '90%',
          maxWidth: '600px',
          marginTop: '60px', // pushes modal below navbar if fixed
          zIndex: 1001,
        }}
        overlayStyle={{
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
        }}
      >
        {(close) => (
          <div className="doctor-popup-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="doctor-popup-header">
              <div className="doctor-card-profile-image-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">{speciality}</div>
                <div className="doctor-card-detail-experience">{experience} years experience</div>
                <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
              </div>
            </div>

            {appointments.length > 0 ? (
              <>
                <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                {appointments.map((appointment) => (
                  <div className="bookedInfo" key={appointment.id}>
                    <p>Name: {appointment.name}</p>
                    <p>Phone Number: {appointment.phoneNumber}</p>
                    <p>Appointment Date: {appointment.appointmentDate}</p>
                    <button type="button" onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                  </div>
                ))}
              </>
            ) : (
              <AppointmentFormIC
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DoctorCardIC;