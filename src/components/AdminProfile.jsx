import React, { useEffect, useState } from 'react'
import { getUserBookings, getStationDetails, deleteBooking, getUserDetails, getAdminById } from '../api-helpers/api-helpers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, ListItemText, Typography, List, ListItem, Grid, IconButton } from '@mui/material';

function AdminProfile() {
    const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  const email = localStorage.getItem('Adminemail') || 'Guest';
  const id = localStorage.getItem('AdminId') || 'Guest';



  return (
    <div>
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
              Admin Id:{id} 
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
            {/* Bookings */}
          </Typography>
          <Box margin={'auto'} display='flex' flexDirection={"column"} width="100%">
            
            {/* <List>
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
            </List> */}
          </Box>
        </Grid>
      </Grid>
    </Box>

    </div>
  )
}

export default AdminProfile