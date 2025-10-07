import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, setAppointmentData, setCanceledAppointment, appointmentData }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasAppointment, setHasAppointment] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(name);
    setHasAppointment(!!stored && !!appointmentData && appointmentData.doctorName === name);
  }, [appointmentData, name]);

  const handleBooking = () => setShowModal(true);

  const handleCancel = () => {
    localStorage.removeItem(name);
    localStorage.removeItem('doctorData');
    setAppointmentData(null);
    setCanceledAppointment(true);
    setHasAppointment(false);
  };

  const handleFormSubmit = (formData) => {
    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      ...formData,
    };

    localStorage.setItem(name, JSON.stringify(newAppointment));
    setHasAppointment(true);

    if (setAppointmentData) setAppointmentData(newAppointment);
    setShowModal(false);
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
            className={hasAppointment ? 'book-appointment-btn cancel-appointment-btn' : 'book-appointment-btn'}
            onClick={hasAppointment ? handleCancel : handleBooking}
        >
            {hasAppointment ? 'Cancel Appointment' : 'Book Appointment'}
            {!hasAppointment && <div style={{ fontSize: '12px' }}>No Booking Fee</div>}
        </button>
        </div>

        <div className="doctor-card-options-container">
        <Popup
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
            closeOnDocumentClick
            contentStyle={{ width: '90%', maxWidth: '600px', padding: 0, border: 'none', background: 'transparent' }}
            overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
        >
            {(close) => (
            !hasAppointment ? (
                <AppointmentFormIC
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
                onClose={close}
                />
            ) : (
                <div className="bookedInfo" style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
                <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                <p>Name: {appointmentData?.name}</p>
                <p>Phone Number: {appointmentData?.phoneNumber}</p>
                <p>Appointment Date: {appointmentData?.appointmentDate}</p>
                <button
                    type="button"
                    onClick={() => { handleCancel(); close(); }}
                    className="book-appointment-btn cancel-appointment-btn"
                >
                    Cancel Appointment
                </button>
                </div>
            )
            )}
        </Popup>
        </div>
    </div>
    );
}

export default DoctorCardIC;