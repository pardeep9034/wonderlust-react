import React from 'react';
import ReviewsCard from './ReviewsCard';
import { Typography } from '@mui/material';
import axios from 'axios';

const AllReview = ({listingId}) => {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/${listingId}`);
        setReviews(response.data.reviews);
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }
  );


      



  return (
    <div className="container mt-5">
      <Typography variant="h4" className="text-center" gutterBottom>
        All Reviews
      </Typography>
      
     {reviews.length === 0 ? (
        <Typography variant="h6" className="text-center">
          No reviews yet.
        </Typography>
      ) : (
        <div className="reviews grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {reviews.map((review) => (
          <ReviewsCard key={review._id} review={review} name={review.author.username}/>
        ))}
      </div>
      )}
    </div>
  );
};

export default AllReview;
