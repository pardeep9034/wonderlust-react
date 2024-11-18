import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import Review from './review';
import AllReview from './allReview';
import './details.css';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [listingOwner, setListingOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/listings/${id}`);
        setCardDetails(response.data.listing);
        setListingOwner(response.data.listing.owner._id);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/user', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchCardDetails();
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/listings/${id}`, { withCredentials: true });
      navigate("/"); // Redirect to main page
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <CircularProgress className="mx-auto my-16" />;

  if (!cardDetails) return <Typography className="text-center">Listing not found.</Typography>;

  return (
    <div className="container mx-auto mt-8 px-4">
      {/* Main Card Container */}
      <Box className="max-w-3xl mx-auto shadow-sm p-6 bg-white rounded-md">
        
        {/* Listing Image */}
        <div className="text-center mb-4 w-72">
          <img
            src={cardDetails.image?.url || "/default-image.jpg"}
            alt={cardDetails.title}
            className="w-full rounded-lg mb-4"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px', // Smooth edges for image
            }}
          />
        </div>

        {/* Listing Details */}
        <Typography variant="h5" className="font-semibold mb-4">
          {cardDetails.title}
        </Typography>

        <Typography variant="body1" className="text-gray-700 mb-4">
          {cardDetails.description}
        </Typography>

        <Typography variant="body2" className="text-gray-600 mb-2">
          <strong>Location:</strong> {cardDetails.location}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mb-2">
          <strong>Country:</strong> {cardDetails.country}
        </Typography>

        <Typography variant="h6" className="font-semibold mt-4 text-gray-900">
          ₹ {cardDetails.price} / night
        </Typography>

        {/* Actions (Edit/Delete) for Listing Owner */}
        {user && user._id === listingOwner && (
          <Box className="mt-6 text-center">
            <Button variant="outlined" color="primary" onClick={handleEdit} className="mx-2">
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete} className="mx-2">
              Delete
            </Button>
          </Box>
        )}
      </Box>

      {/* Review Section */}
      <div className="mt-8">
        <Review listingId={id} />
      </div>

      {/* All Reviews Section */}
      <div className="mt-6">
        <AllReview listingId={id} />
      </div>
    </div>
  );
};

export default Details;
