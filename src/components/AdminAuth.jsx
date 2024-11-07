import React from 'react'
import React from 'react';
import AuthForm from './AuthForm';
import { sendAdminAuthRequest } from '../api-helpers/api-helpers';

// Define the onResReceived function
const onResReceived = (data) => {
    console.log("Response received:", data);
    // You can handle the response data here
    // e.g., navigate to another page, update state, etc.
  };

  const getData = (data) => {
    console.log("Data submitted:", data);
    sendUserAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };


function AdminAuth() {
  return (
    <div>
    <AuthForm onSubmit={getData} isAdmin={true} />
  </div>
  )
}

export default AdminAuth