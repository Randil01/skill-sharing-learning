import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const Profile = () => {

    const [tabValue,setTabValue] = useState("1");
    const navigate=useNavigate();
    const handleBack=()=>navigate(-1);
    const handleOpenProfile=()=>{
        console.log("Open profile model")
    }
    const handleflollowUser=()=>{
        console.log("folow user")
    }
    const handleTabChange=(event, newValue)=>{
        setTabValue(newValue)

        if(newValue === 3 )
        {
            console.log("tab3")
        }
        else if(newValue === 1)
        {
            console.log("tab1")
        }
    }
    
  return (
    <div>
      <section className={'z-50 flex items-center sticky top-0 bg-opacity-95'}>
        <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}/>
        <h1 className='py-5 text-x1 font-bold opacity-90 ml-5'>Test this</h1>
      </section>

      <section>
        <img className='w-[100%] h-[15rem] object-cover'src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaj8dygYNAVcMTFuIJRkAqK_n_PVoL_n4P4g&s" alt=""/>
      </section>

      <section className='pl-6'>
        <div className='flex jutify-between items-start mt-5 h-[5rem]'>
            <Avatar className='transform -translate-y-12' alt='Test with me' sx={{width:"5rem",height:"5rem",border:"4px solid white"}}/>

            {true?<Button variant='contained' sx={{borderRadius:"20px"}} onClick={handleOpenProfile}>
                Edit profile
            </Button>: <Button variant='contained' sx={{borderRadius:"20px"}} onClick={handleflollowUser}>
                {true?"Follow":"Unfollow"}
            </Button>}
        </div>
        <div>
            <div className='flex items-center'>
                <h1 className='font-bold text-lg'>Test name</h1>
            </div>
            <h1 className='text-gray-500'>@code nmae</h1>
        </div>

        <div className='mt-2 space-y-3'>
            <p>Hwllo this is testings qwuis spqwospqs siohsioqhws</p>

            <div className='py-1 flex space-x-5'>
                <div className='felx item-center text-gray-500'>
                    <BusinessCenterIcon/>
                    <p className='ml-2'>Education</p>
                </div>
                <div className='felx item-center text-gray-500'>
                    <LocationOnIcon/>
                    <p className='ml-2'>From</p>
                </div>
            </div>

            <div className='flex items-center space-x-5'>
                <div className='flex items-center space-x-1 font-semibold'>
                    <span>590</span>
                    <span className='text-gray-500'>Followers</span>
                </div>

                <div className='flex items-center space-x-1 font-semibold'>
                    <span>50</span>
                    <span className='text-gray-500'>Following</span>
                </div>
            </div>
        </div>
      </section>
      <section>
        <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Test 1" value="2" />
            <Tab label="Test 2" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
           {/* {[1,1,1,1]}.map(item)=><Vishwas/>*/}
        </TabPanel>
        <TabPanel value="2">Test 1</TabPanel>
        <TabPanel value="3">Test 2</TabPanel>
      </TabContext>
        </Box>
        </div>
      </section>
    </div>
  )
}

export default Profile
