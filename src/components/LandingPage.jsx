import { Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StationItem from './StationItem';
import { Link } from 'react-router-dom';
import { getAllStations } from '../api-helpers/api-helpers';

function LandingPage() {
    const [stations, setStations] = useState([]); // Initialize as an empty array

    useEffect(() => {
        getAllStations()
            .then((data) => {
                console.log("Stations data:", data); // Log the API response
                // Check if 'station' is an array and set the stations state
                if (data && Array.isArray(data.station)) {
                    setStations(data.station); // Set stations to the array from the object
                } else {
                    console.error("Data is not valid:", data); // Log an error if data isn't valid
                    setStations([]); // Set to empty array if not valid
                }
            })
            .catch((err) => console.error("Error fetching stations:", err)); // Log any errors
    }, []);

    return (
        <Box>
            <Box padding={5} margin="auto">
                <Typography variant='h4' textAlign={'center'}>
                    Our Stations
                </Typography>
            </Box>
            <Box 
                display="flex" 
                width="80%" 
                justifyContent="space-between" 
                flexWrap="wrap" 
                margin="auto" 
                gap={2}
            >
                {stations.length > 0 ? (
                    stations.slice(0, 3).map((station) => (
                        <Box key={station._id} width={{ xs: "100%", sm: "30%" }}>
                            <StationItem
                                id={station._id}
                                title={station.sname} // Use sname instead of title
                                photoUrl={station.photoUrl}
                                description={station.description}
                                location={station.location}
                            />
                        </Box>
                    ))
                ) : (
                    <Typography>No stations available</Typography> // Message if no stations are found
                )}
            </Box>
            <Box display="flex" padding={5} margin="auto" justifyContent="flex-end">
                <Button
                    variant="contained"
                    component={Link}
                    to="/stations"
                    sx={{ backgroundColor: "green", color: "white", ":hover": { backgroundColor: "darkgreen" } }}
                >
                    View All Stations
                </Button>
            </Box>
        </Box>
    );
}

export default LandingPage;
