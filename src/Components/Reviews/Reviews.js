import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm/ReviewForm';
import './Reviews.css';

const Reviews = ({ currentUser = 'guest' }) => {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState({}); // { doctorName: { userId: reviewText } }

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  }, []);

  const handleReviewSubmit = (doctorName, reviewText) => {
    setReviews(prev => ({
      ...prev,
      [doctorName]: {
        ...prev[doctorName],
        [currentUser]: reviewText,
      }
    }));
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
          {doctors.map((doctor, index) => {
            const userReview = reviews[doctor.name]?.[currentUser];
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <ReviewForm
                    doctor={doctor}
                    onSubmit={(reviewText) => handleReviewSubmit(doctor.name, reviewText)}
                    disabled={!!userReview} // disable if this user already reviewed
                  />
                </td>
                <td>{userReview || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;