import React from 'react';
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from './store';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnResRecived = (data) => {
    console.log(data);
    dispatch(adminActions.login());

    // Store admin data in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("AdminId", data.id);
    localStorage.setItem("Adminemail", data.email);

    // Show success Swal alert
    Swal.fire({
      title: 'Login Successful!',
      text: 'Welcome, Admin!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate("/"); // Navigate after user clicks "OK"
    });
  };

  const getData = (data) => {
    console.log("Admin:", data);
    sendAdminAuthRequest(data.inputs)
      .then(OnResRecived)
      .catch((err) => {
        console.log(err);
        // Show error Swal alert
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
}

export default Admin;
