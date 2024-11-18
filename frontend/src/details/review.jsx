import React, { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../component/GeneralContext';
import { useContext } from 'react';

const Review = ({ listingId }) => {
  const {user, setUser} = useContext(UserContext);


  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const { rating, comment } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/signin');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/review/${listingId}`, formData,{
        headers: {
          'Content-Type': 'application/json',

      },
      withCredentials: true
      }


      );
      console.log(response.data);
      if (response.data.success) {
        navigate(`/details/${listingId}`);  // Redirect to the listing details page
        setFormData({ rating: "", comment: "" });  // Clear the form
      }

    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  return (
    <div className="container mb-4">
      <Typography variant="h4" className="text-center" gutterBottom>Leave a Review</Typography>
      <div className="review-form flex justify-center">
        <form onSubmit={handleSubmit} className="w-1/2">
          <div className="mb-3 mt-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <fieldset className="starability-slot">
              {Array.from({ length: 5 }, (_, i) => (
                <React.Fragment key={i + 1}>
                  <input
                    type="radio"
                    id={`rate${i + 1}`}
                    name="rating"
                    value={i + 1}
                    onChange={handleChange}
                    checked={rating === String(i + 1)}
                  />
                  <label htmlFor={`rate${i + 1}`} title={`${i + 1} star`}>{i + 1} star</label>
                </React.Fragment>
              ))}
            </fieldset>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="comment" className="form-label">Comments</label>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="5"
              className="form-control"
              value={comment}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-outline-secondary">Submit</button>
        </form>
      </div>
      <br />
      <hr />
    </div>
  );
};

export default Review;
