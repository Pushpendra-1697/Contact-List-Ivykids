import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import ContactDetails from './ContactDetails';


const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/register' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/contact' element={<ContactDetails />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;