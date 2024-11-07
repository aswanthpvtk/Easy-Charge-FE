import { AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EvStationIcon from '@mui/icons-material/EvStation';
import { getAllStations } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from './store';

const dummyArray = ['abc', "bcd", "asshk", "fghj"];

function Header() {

    const dispatch=useDispatch()
    const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
    const [value, setValue] = useState(0);
    const [stations,setStations]=useState([])
    useEffect(()=>{
        getAllStations()
        .then((data)=>setStations(data.stations))
        .catch((err)=>console.log(err));
        
    },[])

    // console.log(stations.sname);

    const logout=(isAdmin)=>{
        dispatch(isAdmin?adminActions.logout():userActions.logout())
    }
    
    

    return (
        <>
            <AppBar sx={{ backgroundColor: 'darkgreen' }} position='sticky'>
                <Toolbar>
                    <Box width={"20%"}>
                        {/* <IconButton> */}
                        <EvStationIcon LinkComponent={Link} to="" /> 
                        {/* </IconButton> */}
                        
                    </Box>
                    <Box width={"30%"} margin={"auto"}>
                        {/* <Autocomplete
                            freeSolo
                            options={stations && stations.map((option) => option.sname)}
                            renderInput={(params) => (
                                <TextField variant='standard' {...params} placeholder="Search Stations" />
                            )}
                        /> */}
                    </Box>
                    <Box display={"flex"}>
                        <Tabs>
                             
                        <Tab sx={{ color: 'white' }} LinkComponent={Link} to="/stations" label="Stations" />
                             {!isAdminLoggedIn && !isUserLoggedIn && 
                             <>
                             {/* <Tab LinkComponent={Link} to="/home"  label="Home" /> */}

                             <Tab LinkComponent={Link} to="/admin" label="Admin Login" />
                           <Tab LinkComponent={Link} to="/auth"  label="UserLogin" />
                             </>}
                            {
                                isUserLoggedIn && 
                               ( <>
                                <Tab LinkComponent={Link} to="/user" label="Profile" />
                                <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/"  label="Logout" />
                               </>)
                            }
                            
                            {
                                isAdminLoggedIn && 
                               ( <>
                                <Tab LinkComponent={Link} to="/addStation" label="Add station" />
                                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                                <Tab onClick={()=>logout(true)} LinkComponent={Link} to="/"  label="Logout" />
                               </>)
                            }
                            

                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;
