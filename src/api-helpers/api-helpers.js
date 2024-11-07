import axios from "axios"
// export const getAllStations=async()=>{
//     const res=await axios
//               .get("http://localhost:5000/station")
//               .catch((err)=>console.log(err));

//     if(res.status !==200){
//         return console.log("no data")
//     }

//     const data=await res.data;
//     return data;
// };


// Example API helper function



export const getAllStations = async () => {
    const response = await fetch('https://easy-charge-be-7.onrender.com/station'); // Replace with your API endpoint
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Ensure this is an array
};

// export const getAllMovies = async () => {
//   const res = await axios.get("/movie").catch((err) => console.log(err));

//   if (res.status !== 200) {
//     return console.log("No Data");
//   }

//   const data = await res.data;
//   return data;
// };


export const sendUserAuthRequest = async (data, signup) => {
    const res = await 
    axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      phone:data.phone,
      email: data.email,
      password: data.password,
    })
      .catch((err) => console.log(err));
  
    if (res.status !== 200 && res.status !== 201) {
      console.log("Unexpected Error Occurred");
    }
  
    const resData = await res.data;
    return resData;
  };
  



  export const sendAdminAuthRequest = async (data) => {
    const res = await axios
      .post("/admin/login", {
        email: data.email,
        password: data.password,
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
  
    const resData = await res.data;
    return resData;
  };


  export const getStationDetails = async (id) => {
    const res = await axios.get(`/station/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };



  export const newBooking = async (data) => {
    const res = await axios
      .post("/booking", {
        station: data.station,
        slot: data.slotNumber,
        date: data.date,
        user: localStorage.getItem("userid"),
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 201) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };


  export const getUserBookings=async()=>{
    const id=localStorage.getItem('userid')
    const res=await axios
    .get(`/user/bookings/${id}`)
    .catch(err=>console.log(err));

    if(res.status !== 200){
      return console.log("unexpected error");
      
    }
    const resData= await res.data;
    return resData;

  }

//   export const getUserDetails = async (userId) => {
//     const res = await axios
//         .get(`/user/${userId}`)
//         .catch(err => {
//             console.log(err);
//             return null;
//         });

//     if (res && res.status !== 200) {
//         console.log("Unexpected error fetching user details");
//         return null;
//     }
    
//     return res.data; // Return user data
// };


export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};



export const addStation = async (data) => {
  const res = await axios
    .post(
      "/station",
      {
        sname: data.sname,
        description: data.description,
     
        photoUrl: data.photoUrl,
        features: data.features,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};



export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};