import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist',
    'Gynecologist/obstetrician',
    'General Physician',
    'Dermatologist',
    'Ear-nose-throat (ent) Specialist',
    'Homeopath',
    'Ayurveda'
];

const FindDoctorSearchIC = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/appointments?speciality=${speciality}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchDoctor.trim() !== '') {
            navigate(`/appointments?speciality=${searchDoctor}`);
        }
    };

    return (
        <div className='finddoctor'>
            <h1>Find a doctor and Consult instantly</h1>
            <div>
                <i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i>
            </div>
            <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="doctor-search-box">
                    
                    {/* Input + dropdown wrapper */}
                    <div className="input-wrapper" style={{ flex: 1, position: 'relative' }}>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className="search-doctor-input-box"
                                placeholder="Search doctors, clinics, hospitals, etc."
                                onFocus={() => setDoctorResultHidden(false)}
                                value={searchDoctor}
                                onChange={(e) => setSearchDoctor(e.target.value)}
                            />
                        </form>

                        {/* Dropdown */}
                        {!doctorResultHidden && (
                            <div className="search-doctor-input-results">
                                {specialities.map(speciality => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        onMouseDown={() => handleDoctorSelect(speciality)}
                                    >
                                        <span>
                                            <img
                                                src={process.env.PUBLIC_URL + '/images/search.svg'}
                                                alt=""
                                                style={{ height: "10px", width: "10px" }}
                                            />
                                        </span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search icon */}
                    <div className="findiconimg">
                        <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.png'} alt="" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FindDoctorSearchIC;