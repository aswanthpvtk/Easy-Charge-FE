import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './StationItem.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access the login state
import Swal from 'sweetalert2'; // Import SweetAlert2

function StationItem({ title, photoUrl, id, location, description }) {
  const navigate = useNavigate();

  // Access the login states from your store
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Function to handle the Book button click
  const handleBookClick = () => {
    if (!isAdminLoggedIn && !isUserLoggedIn) {
      // If neither admin nor user is logged in, show a SweetAlert and redirect
      Swal.fire({
        title: 'Not Logged In',
        text: 'You need to log in to proceed with booking.',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirect to home page after the alert is closed
        navigate('/');
      });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 250, borderRadius: 5 }} className='card ms-2 mt-2 mb-5'>
        <img height="250px" width="250px" src={photoUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <div>
              Location: {location}
            </div>
            <div>
              Description: {description}
            </div>
          </Typography>
        </CardContent>
        <CardActions>
          {/* If admin or user is logged in, show the "Book" button, otherwise handle login */}
          {(isAdminLoggedIn || isUserLoggedIn) ? (
            <Button 
              LinkComponent={Link} 
              to={`/booking/${id}`}
              sx={{
                margin: "auto",
                backgroundColor: "green", // Replace with your desired green shade
                color: "white", // Text color
                '&:hover': {
                  backgroundColor: "darkgreen", // Darker shade on hover
                },
              }}
              size="small"
            >
              Book
            </Button>
          ) : (
            <Button
              onClick={handleBookClick}
              sx={{
                margin: "auto",
                backgroundColor: "red", // Indicating it's unavailable
                color: "white",
                '&:hover': {
                  backgroundColor: "darkred",
                },
              }}
              size="small"
            >
              Book
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default StationItem;
