import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Stations from './components/Stations'
import Admin from './components/Admin'
import HomePage from './components/HomePage'
import Auth from './components/Auth'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, userActions } from './components/store'
import Booking from './components/Booking'
import Profile from './components/UserProfile'
import UserProfile from './components/UserProfile'
import AddStation from './components/AddStation'
import AdminProfile from './components/AdminProfile'

function App() {
  const dispatch=useDispatch();
  const [count, setCount] = useState(0)
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
  console.log("isAdminLoggedIn",isAdminLoggedIn);
  console.log("isUserLoggedIn",isUserLoggedIn);
  useEffect(()=>{ 
    if(localStorage.getItem("userId")){
      
      dispatch(userActions.login());
    }else if(localStorage.getItem("adminId")){
     
      dispatch(adminActions.login());
    }

  },[])
  
  

  return (
    <>
      <div>
        <Header/>
             <section>
              <Routes>
              <Route path="/" element={<HomePage/>}/>
                <Route path="/stations" element={<Stations/>}/>
                <Route path="/Admin" element={<Admin/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/land" element={<LandingPage/>}/>
                <Route path="/booking/:id" element={<Booking/>}/>
                <Route path="/user" element={<UserProfile/>}/>
                <Route path="/addStation" element={<AddStation/>}/>
                <Route path="/user-admin" element={<AdminProfile/>}/>







              </Routes>
             </section>
             <Footer/>
      </div>
    </>
  )
}

export default App
