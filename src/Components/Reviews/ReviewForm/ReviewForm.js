import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

function ReviewForm({ doctor, onSubmit, disabled }) {
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (starValue) => {
    setFormData({ ...formData, rating: starValue });
  };

  const handleSubmit = (e, close) => {
    e.preventDefault();
    if (!formData.name || !formData.review || formData.rating === 0) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    const message = `Rating: ${formData.rating} - ${formData.review} (by ${formData.name})`;
    setSubmittedMessage(message);
    onSubmit(message);
    setFormData({ name: '', review: '', rating: 0 });
    close();
  };

  return (
    <Popup
      trigger={
        <button className="review-btn" disabled={disabled}>
          {disabled ? 'Reviewed' : 'Review'}
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="doctor-popup-container">

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

          <form className="review-form" onSubmit={(e) => handleSubmit(e, close)}>
            <h2>Give Your Feedback</h2>

            {showWarning && <p className="warning">Please fill out all fields.</p>}

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="review">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
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

            <div className="form-actions">
              <button type="submit" className="book-appointment-btn">Submit</button>
              <button type="button" onClick={close} className="book-appointment-btn cancel-appointment-btn">Cancel</button>
            </div>
          </form>

          {submittedMessage && (
            <div className="submitted-message">
              <h3>Submitted Message:</h3>
              <p>{submittedMessage}</p>
            </div>
          )}
        </div>
      )}
    </Popup>
  );
}

export default ReviewForm;