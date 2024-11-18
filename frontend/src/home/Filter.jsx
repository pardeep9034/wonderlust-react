import React, { useContext } from 'react';
import { UserContext } from '../component/GeneralContext';
import { Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import HikingIcon from '@mui/icons-material/Hiking';
import CastleIcon from '@mui/icons-material/Castle';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import './filter.css';

export default function Filter() {
    const { setSelectedCategory } = useContext(UserContext);
    
    const handleclick = (category) => {
        setSelectedCategory(category);
    };

    // Ensure setSelectedCategory is logged
    console.log("setSelectedCategory:", setSelectedCategory);

    const categories = [
        { name: "trending", icon: <WhatshotIcon /> },
        { name: "urban", icon: <ApartmentIcon /> },
        { name: "cultural", icon: <FilterHdrIcon /> },
        { name: "adventure", icon: <HikingIcon /> },
        { name: "historical", icon: <CastleIcon /> },
        { name: "beach", icon: <BeachAccessIcon /> },
        { name: "cold", icon: <AcUnitIcon /> },
    ];

    return (
        <div className="filters-wrapper">
            <div className="scrollable-filters">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="filter"
                        onClick={() => {
                            handleclick(category.name);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {category.icon}
                        <Typography>{category.name}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}
