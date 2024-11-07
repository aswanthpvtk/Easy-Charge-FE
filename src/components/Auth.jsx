import React from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from './store';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnResRecived = (data) => {
    console.log(data); // Log the entire response to see the exact message

    dispatch(userActions.login());
    localStorage.setItem('userid', data.id);
    localStorage.setItem('username', data.name);
    localStorage.setItem('email', data.email);
    
    // Check the message case-sensitively, update to the correct format
    if (data.message.toLowerCase() === 'login successfull') {  // Adjusted to handle case sensitivity
      navigate('/');
      toast.success('Login successful!');
    } else if (data.message.toLowerCase() === 'registration successfully') {
      toast.success('Registration successful!');
    } else {
      toast.error('Unexpected response!');
    }
  };

  const getData = (data) => {
    console.log('User:', data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(OnResRecived)
      .catch((err) => toast.error('An error occurred!'));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
      <ToastContainer /> {/* This enables toast notifications */}
    </div>
  );
}

export default Auth;
