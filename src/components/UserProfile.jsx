import React, { useEffect, useState } from 'react';
import { getUserBookings, getStationDetails, deleteBooking, getUserDetails } from '../api-helpers/api-helpers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, ListItemText, Typography, List, ListItem, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';  // Import SweetAlert2

function UserProfile() {
  const [bookings, setBookings] = useState([]);
  const [stationData, setStationData] = useState({}); // To store station details
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBookings()
      .then(async (res) => {
        setBookings(res.bookings);
        
        // Fetch station details for each booking
        const stations = await Promise.all(res.bookings.map(booking => getStationDetails(booking.station)));
        
        // Store station details in an object with station ID as the key
        const stationMap = {};
        stations.forEach((station, index) => {
          stationMap[res.bookings[index].station] = station;
        });

        setStationData(stationMap);
      })
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const username = localStorage.getItem('username') || 'Guest';
  const email = localStorage.getItem('email') || 'Guest';

  // Function to handle booking deletion
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        // Show success alert after successful deletion
        Swal.fire({
          icon: 'success',
          title: 'Booking Deleted!',
          text: 'Your booking has been successfully deleted.',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#3085d6',  // Customize button color
        });
        
        // Optionally, update bookings state after deletion
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => {
        console.error(err);
        // Show error alert if there is a failure
        Swal.fire({
          icon: 'error',
          title: 'Failed to Delete',
          text: 'There was an issue deleting the booking. Please try again.',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#d33',
        });
      });
  };

  return (
    <Box width={"100%"} padding={2}>
      <Grid container spacing={2}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            border={1}
            borderColor="#ccc"
            borderRadius={6}
          >
            <AccountCircleIcon sx={{ fontSize: "10rem" }} />
            <Typography padding={1}>
              Name: {username}
            </Typography>
            <Typography padding={1} marginTop={2}>
              Email: {email}
            </Typography>
          </Box>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            fontFamily={"verdana"}
            textAlign="center"
            padding={2}
          >
            Bookings
          </Typography>
          <Box margin={'auto'} display='flex' flexDirection={"column"} width="100%">
            <List>
              {bookings.map((booking, index) => (
                <ListItem key={index} sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 1 }}>
                  <ListItemText sx={{ margin: 1, textAlign: "left" }}>
                    Station: {stationData[booking.station]?.sname || 'Loading...'}
                  </ListItemText>
                  <ListItemText sx={{ margin: 1, textAlign: "left" }}>
                    Slot: {booking.slot}
                  </ListItemText>
                  <ListItemText sx={{ margin: 1, textAlign: "left" }}>
                    Date: {new Date(booking.date).toLocaleDateString()}
                  </ListItemText>
                  <IconButton onClick={() => handleDelete(booking._id)} color='error'>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
