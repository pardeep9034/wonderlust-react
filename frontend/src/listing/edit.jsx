import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams(); // Extract id from params
  const options = ['trending', 'urban', 'cultural', 'adventure', 'beach', 'mountain', 'historical', 'cold'];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    country: '',
    description: '',
    category: '',
    price: '',
    location: '',
  });
  const [image, setImage] = useState(null);

  const { title, description, category, price, country, location } = formData;

  useEffect(() => {
    // Fetch the existing data of the listing to pre-fill the form
    const fetchListingData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/listings/${id}`, { withCredentials: true });
        const listing = response.data;
        setFormData({
          title: listing.title,
          country: listing.country,
          description: listing.description,
          category: listing.category,
          price: listing.price,
          location: listing.location,
        });
      } catch (error) {
        console.error("Error fetching listing data:", error);
      }
    };

    fetchListingData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append('title', title);
    newFormData.append('country', country);
    newFormData.append('description', description);
    newFormData.append('category', category);
    newFormData.append('price', price);
    newFormData.append('location', location);
    newFormData.append('image', image);

    try {
      const response = await axios.put(
        `https://wonderlust-backend.onrender.com/api/listings/${id}`,
        newFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert('Listing updated successfully!');
        setFormData({
          title: '',
          country: '',
          description: '',
          category: '',
          price: '',
          location: '',
        });
        setImage(null);
        navigate('/');
      } else {
        alert('Error: Unable to update listing. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('Error: Unable to update listing. Please check the server and try again.');
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
       

        backgroundColor: '#f9f9f9',
        padding: 2,
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            Edit Listing
          </Typography>
          <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={title}
              onChange={handleChange}
              fullWidth
              required
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
              <TextField
                label="Country"
                variant="outlined"
                name="country"
                value={country}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Location"
                variant="outlined"
                name="location"
                value={location}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
              <TextField
                label="Price"
                variant="outlined"
                name="price"
                value={price}
                onChange={handleChange}
                fullWidth
                required
                type="number"
              />
              <TextField
                label="Category"
                variant="outlined"
                name="category"
                value={category}
                onChange={handleChange}
                fullWidth
                required
                select
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                textTransform: 'none',
                color: '#333',
                borderColor: '#ccc',
                ':hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              Upload Image
              <input type="file" hidden name="image" onChange={handleImageChange} accept="image/*" />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                paddingY: 1.5,
                borderRadius: 1,
              }}
            >
              Update Listing
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Edit;
