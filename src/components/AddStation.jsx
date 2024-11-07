import { TextField, Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { FormLabel } from 'react-bootstrap';
import { addStation } from '../api-helpers/api-helpers';
import { useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';  // Import SweetAlert2

const labelProps = {
  mt: 1,
  mb: 1,
};

function AddStation() {
  const [inputs, setInputs] = useState({ sname: "", description: "", photoUrl: "", features: "" });

  // Media query hook for responsiveness
  const isMobile = useMediaQuery('(max-width:600px)'); // Mobile screen
  const isTablet = useMediaQuery('(max-width:960px)'); // Tablet screen

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addStation({ ...inputs })
      .then((res) => {
        console.log(res);
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Station Added!',
          text: 'The new station has been successfully added.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      })
      .catch((err) => {
        console.log(err);
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Station',
          text: 'There was an error adding the station. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={isMobile ? '90%' : isTablet ? '70%' : '50%'} // Adjust width based on screen size
          padding={isMobile ? 3 : isTablet ? 6 : 10} // Adjust padding based on screen size
          margin="auto"
          display={'flex'}
          flexDirection="column"
          boxShadow={"10px 10px 20px #cee"}
          bgcolor={isMobile ? '#f9f9f9' : 'white'}
          borderRadius={isMobile ? '8px' : '12px'}
        >
          <Typography 
            textAlign={'center'} 
            variant={isMobile ? 'h6' : 'h5'} 
            fontFamily={'verdana'} 
            mb={isMobile ? 2 : 3}
          >
            Add Station
          </Typography>

          <FormLabel sx={labelProps}>Station Name</FormLabel>
          <TextField
            value={inputs.sname}
            onChange={handleChange}
            name='sname'
            variant='standard'
            margin='normal'
            fullWidth
          />

          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name='description'
            variant='standard'
            margin='normal'
            fullWidth
            multiline
            rows={isMobile ? 2 : 4} // More rows on larger screens
          />

          <FormLabel sx={labelProps}>Photo URL</FormLabel>
          <TextField
            value={inputs.photoUrl}
            onChange={handleChange}
            name='photoUrl'
            variant='standard'
            margin='normal'
            fullWidth
          />

          <FormLabel sx={labelProps}>Features</FormLabel>
          <TextField
            value={inputs.features}
            onChange={handleChange}
            name='features'
            variant='standard'
            margin='normal'
            fullWidth
          />

          <Button
            type='submit'
            sx={{
              width: isMobile ? "70%" : "30%", // Adjust button width based on screen size
              bgcolor: "green",
              color: "white",
              alignSelf: 'center',
              mt: isMobile ? 2 : 3,
              ":hover": { bgcolor: "#121123" },
              fontSize: isMobile ? "0.9rem" : "1rem"
            }}
          >
            Add
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AddStation;
