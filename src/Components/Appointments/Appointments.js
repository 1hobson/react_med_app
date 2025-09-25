import React, { useEffect, useState } from 'react'; 
import './Appointments.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const Appointments = ({ setAppointmentData }) => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        if (searchParams.get('speciality')) {
          const filtered = data.filter(
            doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
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
  };

  useEffect(() => {
    getDoctorsDetails();
  }, [searchParams]);

  const handleBookAppointment = (appointment, doctorName) => {
    localStorage.setItem(doctorName, JSON.stringify(appointment));
    if (setAppointmentData) {
      setAppointmentData(appointment);
    }
  };

  return (
    <div className="appointments-page">
      <div className="searchpage-container">
        <FindDoctorSearch
          onSearch={(text) => {
            if (text === '') {
              setFilteredDoctors([]);
              setIsSearched(false);
            } else {
              const filtered = doctors.filter(doctor =>
                doctor.speciality.toLowerCase().includes(text.toLowerCase())
              );
              setFilteredDoctors(filtered);
              setIsSearched(true);
            }
          }}
        />

        <div className="search-results-container">
          {isSearched && (
            <>
              <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <DoctorCard
                    {...doctor}
                    key={doctor.name}
                    setAppointmentData={(appointment) => handleBookAppointment(appointment, doctor.name)}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
