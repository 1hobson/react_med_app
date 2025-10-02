import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm/ReviewForm';
import './Reviews.css';

const Reviews = () => {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState({}); // store reviews by doctor index

  useEffect(() => {
    const getDoctorsDetails = () => {
      fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => setDoctors(data))
        .catch(err => console.log(err));
    };

    getDoctorsDetails();

    // Load saved reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
    setReviews(savedReviews);
  }, []);

  // Callback to handle submitted review
  const handleReviewSubmit = (doctorIndex, reviewText) => {
    setReviews((prev) => {
      const updated = { ...prev, [doctorIndex]: reviewText };
      localStorage.setItem('reviews', JSON.stringify(updated)); // persist
      return updated;
    });
  };

  return (
    <div className="reviews-page">
      <h2>Consultation Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <ReviewForm
                  doctor={doctor}
                  index={index}
                  onSubmit={(reviewText) => handleReviewSubmit(index, reviewText)}
                  disabled={!!reviews[index]} // disable if review exists
                />
              </td>
              <td>{reviews[index] || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;