import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TravelCard({ image, title, price ,listingId}) {
  const navigate = useNavigate();
  const id = listingId;
  
  
  const handleClick = () => {
    console.log("Card clicked", id);
    navigate(`/details/${id}`);
  };

  return (
    <Card 
      sx={{ 
        height: "20rem",
        width: "20rem",
        margin: "1rem",
        borderRadius: ".7rem",
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={image} // Use image prop here
        alt={title} // Use title as the alt text for accessibility
        sx={{ objectFit: 'cover', height: "15rem", width: "100%" }} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title} {/* Use title prop here */}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ₹ {price} / Night &nbsp; +18% GST {/* Use price prop here */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TravelCard;
