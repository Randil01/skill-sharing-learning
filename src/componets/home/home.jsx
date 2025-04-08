import React from 'react';
import { Grid } from '@mui/material';
import Navigation from '../navigation/navigation';
import HomeSection from '../homeSection/homeSection';
import Right from '../search/right'
import Profile from '../profile/profile'
import { Route, Routes } from 'react-router-dom';

const Homepage = () => {
  return (
    <Grid container xs={12} className='px-5 lg:px-36 justify-between'>

      <Grid item xs={0} lg={3} className='px-2 lg:box realtive '>
        <Navigation/>
      </Grid>

      <Grid item xs={12} lg={6} className='px-2 lg:box realtive'>
        <Routes>
            <Route path='/' element={<HomeSection/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>
        </Routes>
      </Grid>

      <Grid item xs={0} lg={3} className='px-2 lg:box realtive'>
        <Right/>
      </Grid>

    </Grid>
  )
}

export default Homepage;
