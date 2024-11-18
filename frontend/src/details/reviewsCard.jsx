import React from 'react';
import { Card, Typography, Box, Rating } from '@mui/material';

const ReviewsCard = ({ review, name }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f9f9f9', // Lighter background color
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#3f51b5' }} // Username styling
        >
          @{name}
        </Typography>
        
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontStyle: 'italic', // Italics for the comment
            color: '#333', // Darker text for readability
          }}
        >
          "{review.comment}"
        </Typography>

        <Box display="flex" alignItems="center">
          <Rating
            name="read-only"
            value={review.rating}
            precision={0.5} // Allows for half-star ratings
            readOnly
            sx={{
              marginRight: 1, // Spacing between stars and text
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: '#757575', // Grey color for the rating text
            }}
          >
            {review.rating} stars
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ReviewsCard;
