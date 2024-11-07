import { Box, Dialog, TextField, Typography, Button, IconButton, FormLabel } from '@mui/material';
import React, { useState, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function AuthForm({onSubmit,isAdmin}) {
 
  
  // State for form inputs
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignUp] = useState(false);
  const  handleChange=(e)=>{
      setInputs((prevState)=>({...prevState,
        [e.target.name]:e.target.value,
      }))
  }

  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   onSubmit(inputs)
  //   console.log({inputs,signup:isAdmin?false:isSignup});
    

  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true} 
>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/home">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={3} textAlign="center">
        <Typography variant='h4' gutterBottom>
          {isSignup ? "SIGN UP" : "LOGIN"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={300} margin={"auto"} alignItems={"center"}>
            {/* Render additional fields for signup */}
           
              {!isAdmin && isSignup &&<>
                {/* <FormLabel>Name</FormLabel> */}
                <TextField
                  value={inputs.name}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='text'
                  name='name'
                  placeholder='Name'
                />
                {/* <FormLabel>Contact Number</FormLabel> */}
                <TextField
                  value={inputs.phone}
                  onChange={handleChange}
                  margin='normal'
                  variant='standard'
                  type='text'
                  name='phone'
                  placeholder='Contact Number'
                />
              </>}
        

            {/* Common Email and Password fields */}
            {/* <FormLabel>Email</FormLabel> */}
            <TextField
              value={inputs.email}
              onChange={handleChange}
              margin='normal'
              variant='standard'
              type='text'
              name='email'
              placeholder='Email'
            />
            {/* <FormLabel>Password</FormLabel> */}
            <TextField
              value={inputs.password}
              onChange={handleChange}
              margin='normal'
              variant='standard'
              type='password'
              name='password'
              placeholder='Password'
            />

            {/* Submit Button */}
            <Button
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: 3,
                bgcolor: 'green',
                color: 'white',
                '&:hover': {
                  bgcolor: '#1c1e30',
                },
              }}
              type="submit"
              variant='contained'
            >
             {isSignup ? "SIGNUP" :"LOGIN"}
            </Button>

            {/* Toggle Between Sign-Up and Login */}
           
              {!isAdmin && 
                <Button
                onClick={()=>setIsSignUp(!isSignup)}
                sx={{
                  mt: 2,
                  mb: 2,
                  borderRadius: 3,
                  bgcolor: 'white',
                  color: 'blue',
                  '&:hover': {
                    bgcolor: '#1c1e30',
                  },
                }}
                variant='contained'
              >
                {isSignup ? "Already have an account? Login ,Tologin after complteing the form " : "New user? Sign Up"}
              </Button>}
           
          </Box>
        </form>
      </Box>
    </Dialog>
  );
}

export default AuthForm;
