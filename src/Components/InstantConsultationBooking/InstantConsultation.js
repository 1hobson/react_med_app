import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = ({ setAppointmentData, setCanceledAppointment, appointmentData }) => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter(
        doctor => doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  const handleBookAppointment = (appointmentDetails, doctorName) => {
    const now = new Date();
    const appointmentWithDetails = {
      ...appointmentDetails,
      doctorName: doctorName,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    localStorage.setItem(doctorName, JSON.stringify(appointmentWithDetails));

    if (setAppointmentData) {
      setAppointmentData(appointmentWithDetails);
    }

    const doctorData = { name: doctorName };
    localStorage.setItem('doctorData', JSON.stringify(doctorData));
  };

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        const specialityParam = searchParams.get('speciality');

        if (specialityParam) {
          const filtered = data.filter(
            doctor => doctor.speciality.toLowerCase() === specialityParam.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }

        setDoctors(data);
      })
      .catch(err => console.log(err));
  }, [searchParams]);

  return (
    <div className="appointments-page">
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />

        <div className="search-results-container">
          {isSearched && (
            <>
              <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doctor => (
                    <DoctorCardIC
                      {...doctor}
                      key={doctor.name}
                      setAppointmentData={(appointment) => handleBookAppointment(appointment, doctor.name)}
                      setCanceledAppointment={setCanceledAppointment}
                      appointmentData={appointmentData} // Pass down current appointment
                    />
                  ))
                ) : (
                  <p>No doctors found.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstantConsultation;