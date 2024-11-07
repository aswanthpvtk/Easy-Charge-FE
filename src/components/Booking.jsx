import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStationDetails, newBooking } from '../api-helpers/api-helpers';
import { Typography, Box, FormLabel, TextField } from '@mui/material';  // Import TextField
import { Button } from 'flowbite-react';
import Swal from 'sweetalert2';  // Import SweetAlert2

function Booking() {
    const [station, setStation] = useState();
    const [inputs, setInputs] = useState({ slotNumber: "", date: "" });
    const id = useParams().id;
    console.log(id);

    useEffect(() => {
        getStationDetails(id)
            .then((res) => setStation(res.station))
            .catch((err) => console.log(err));
    }, [id]);

    console.log(station);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, station: station._id })
            .then((res) => {
                console.log(res);
                // Show success swal alert after booking
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Successful!',
                    text: 'Your booking has been confirmed.',
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#3085d6',  // Customize button color
                });
            })
            .catch((err) => {
                console.error(err);
                // Handle error case (show error alert)
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Failed',
                    text: 'There was an issue with your booking. Please try again.',
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#d33',
                });
            });
    };

    return (
        <div>
            {station && (
                <Fragment>
                    <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={'center'}>
                        Booking Station: <span style={{ color: "green" }}>{station.sname}</span>
                    </Typography>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Box display={"flex"} justifyContent={"center"} flexDirection="column" paddingTop={3} width="50%" marginRight={"auto"}>
                            <img width="80%" height={"300px"} src={station.photoUrl} alt={station.sname} />
                            <Box width={"80%"} marginTop={3} padding={2}>
                                <Typography paddingTop={2}>{station.description}</Typography>
                                <Typography paddingTop={2}>{station.features}</Typography>
                            </Box>
                        </Box>
                        <Box width={"50%"} padding={3}>
                            <form onSubmit={handleSubmit}>
                                <Box padding={5} margin={"auto"} display={"flex"} flexDirection={"column"}>
                                    <FormLabel>Slot Number:</FormLabel>
                                    <TextField
                                        value={inputs.slotNumber}
                                        onChange={handleChange}
                                        name="slotNumber" type="text" margin="normal" variant="standard" />
                                    <FormLabel>Booking Date:</FormLabel>
                                    <TextField
                                        value={inputs.date}
                                        onChange={handleChange}
                                        name="date" type="date" margin="normal" variant="standard" />
                                    <Button class="btn btn-success mt-3" type='submit' sx={{ mt: 3 }}>Book Now</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </div>
    );
}

export default Booking;
