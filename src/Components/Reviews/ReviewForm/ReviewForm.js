import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

function ReviewForm({ doctor, index, onSubmit, disabled }) {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (starValue) => {
    setFormData({ ...formData, rating: starValue });
  };

  const handleSubmit = (e, close) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      onSubmit(`Rating: ${formData.rating} - ${formData.review} (by ${formData.name})`);
      setFormData({ name: '', review: '', rating: 0 });
      close();
    } else {
      alert('Please fill all fields and select a rating.');
    }
  };

  return (
    <Popup
      trigger={
        <button
          className="review-btn"
          disabled={disabled}
          style={{ backgroundColor: disabled ? 'grey' : '', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          {disabled ? 'Reviewed' : 'Click Here'}
        </button>
      }
      modal
      nested
      open={showPopup}
      onOpen={() => !disabled && setShowPopup(true)}
      onClose={() => setShowPopup(false)}
    >
      {(close) => (
        <div className="doctor-popup-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Popup Header (Doctor Info) */}
          <div className="doctor-popup-header">
            <div className="doctor-card-profile-image-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
            <div className="doctor-card-details">
              <div className="doctor-card-detail-name">{doctor.name}</div>
              <div className="doctor-card-detail-speciality">{doctor.speciality}</div>
              <div className="doctor-card-detail-experience">{doctor.experience || 'N/A'} years experience</div>
              <div className="doctor-card-detail-consultationfees">Ratings: {doctor.ratings || 'N/A'}</div>
            </div>
          </div>

          {/* Review Form */}
          <form className="doctor-card-details-container" onSubmit={(e) => handleSubmit(e, close)} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Review:</label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group rating-group">
              <label>Rating:</label>
              <div className="stars">
                {[1,2,3,4,5].map((star) => (
                  <span
                    key={star}
                    className={`star ${formData.rating >= star ? 'filled' : ''}`}
                    onClick={() => handleStarClick(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
              <button type="submit" className="book-appointment-btn">Submit</button>
              <button type="button" onClick={close} className="book-appointment-btn cancel-appointment-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default ReviewForm;
