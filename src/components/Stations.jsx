import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllStations } from '../api-helpers/api-helpers';
import StationItem from './StationItem';

function Stations() {
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
    <>
      <Box margin={"auto"} marginTop={4}>
        <Typography
          margin={"auto"}
          variant="h4"
          padding={2}
          width="40%"
          textAlign={"center"}
        >
          All Stations
        </Typography>
        <Box
          width={"100%"}
          margin="auto"
          marginLeft={"60px"}
          marginTop={5}
          display={"flex"}
          justifyContent="flex-start"
          flexWrap={"wrap"} // Enable wrapping of items
          gap={2} // Add some gap between cards
        >
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <Box  key={index} width={{ xs: "100%", sm: "45%", md: "23%" }}> {/* Adjust widths for different screen sizes */}
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
            <Typography>No stations available</Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Stations;
