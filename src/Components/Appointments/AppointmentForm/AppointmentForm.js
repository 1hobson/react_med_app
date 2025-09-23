import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
  
    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        onSubmit({
          name,
          phoneNumber,
          appointmentDate,
          selectedSlot,
          doctorName,
          doctorSpeciality,
        });
    
        // Reset fields
        setName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setSelectedSlot('');
      };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div className="form-group">
            <label htmlFor="appointmentDate">Select Date:</label>
            <input type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        </div>

        <div className="form-group">
            <label htmlFor="timeSlot">Select Time Slot:</label>
            <select id="timeSlot" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
            <option value="">--Select a slot--</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            </select>
        </div>

        <button type="submit">Book Now</button>
        </form>
    );
  };

export default AppointmentForm