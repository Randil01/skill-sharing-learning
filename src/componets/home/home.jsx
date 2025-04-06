import React from 'react';
import { Grid } from '@mui/material';
import Navigation from '../navigation/navigation';

const Homepage = () => {
  return (
    <Grid container xs={12} className='px-5 lg:px-36 justify-between'>

      <Grid item xs={0} lg={3} className='lg:box realtive '>
        <Navigation/>
      </Grid>

      <Grid item xs={12} lg={6} className='lg:box realtive'>
        <p className='text-center'>middle part</p>
      </Grid>

      <Grid item xs={0} lg={3} className='lg:box realtive'>
        <p className='text-center'>right part</p>
      </Grid>

    </Grid>
  )
}

export default Homepage;
