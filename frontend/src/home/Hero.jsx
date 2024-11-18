import React, { useContext } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../component/GeneralContext";

const Hero = () => {
    const { listings, listingsLoading, error, selectedCategory } = useContext(UserContext);
    const navigate = useNavigate();

    const filteredListings = selectedCategory
        ? listings.filter((listing) => listing.category === selectedCategory) // Filter by category
        : listings;

    return (
        <div className="container mx-auto my-8 px-4 ">
            {/* Loading State */}
            {listingsLoading && (
                <Grid container spacing={3} className="justify-center">
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center text-red-500 font-semibold">
                    <Typography variant="h6">{error}</Typography>
                </div>
            )}

            {/* Listings */}
            {!listingsLoading && !error && filteredListings.length > 0 && (
                <Grid container spacing={3} className="justify-center ">
                    {filteredListings.map((listing) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={listing._id}>
                            <Card
                                className="flex flex-col justify-between shadow-md hover:shadow-lg transition-all h-full"
                                onClick={() => navigate(`/details/${listing._id}`)}
                            >
                                <CardMedia
                                    component="img"
                                    alt={listing.title}
                                    height="200"
                                    image={listing.image?.url || "/default-image.jpg"}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {listing.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ₹ {listing.price} / night
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* No Listings */}
            {!listingsLoading && !error && filteredListings.length === 0 && (
                <div className="text-center text-gray-600 ">
                    <Typography variant="body1">No listings available for {selectedCategory}.</Typography>
                </div>
            )}
        </div>
    );
};

export default Hero;
