import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Initialize user as null
    const [userLoading, setUserLoading] = useState(true);  // Loading state for user
    const [listings, setListings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [listingsLoading, setListingsLoading] = useState(true);  // Loading state for listings
    const [error, setError] = useState(null);  // Error state for listings

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/user', { withCredentials: true });
                setUser(response.data.user);
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser(null);  // Ensure user is set to null if fetching fails
            } finally {
                setUserLoading(false);  // Set loading to false after request completes
            }
        };
        fetchUser();

        const fetchListings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/listings", {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setListings(response.data.listings);
            } catch (err) {
                console.error("Error fetching listings:", err);
                setError("Failed to load listings. Please try again later.");
            } finally {
                setListingsLoading(false);  // Set loading to false for listings after request completes
            }
        }
        fetchListings();
    },[]);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            userLoading,
            listings,
            setListings,
            listingsLoading,
            error,
            selectedCategory, // Provide selected category state
            setSelectedCategory // Provide setter for category
        }}>
            {children}
        </UserContext.Provider>
    );
};
