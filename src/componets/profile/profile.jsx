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
import ProfileModel from './profileModel';

const Profile = () => {
    const [tabValue,setTabValue] = useState("1");
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const [openProfileModal,setOpenProfileModal] = useState(false);
    const handleOpenProfile = () => setOpenProfileModal(true);
    const handleClose = () => setOpenProfileModal(false);
    const handleflollowUser = () => {
        console.log("follow user")
    }
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }
    
    return (
        <div className='min-h-screen'>
            <section className='sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-100'>
                <div className='flex items-center px-4 py-3 space-x-4'>
                    <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}/>
                    <div>
                        <h1 className='text-xl font-bold'>Test name</h1>
                        <p className='text-sm text-gray-500'>0 posts</p>
                    </div>
                </div>
            </section>

            <section>
                <div className='h-[200px] relative bg-gray-100'>
                    <img 
                        className='w-full h-full object-cover'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaj8dygYNAVcMTFuIJRkAqK_n_PVoL_n4P4g&s" 
                        alt=""
                    />
                </div>
            </section>

            <section className='px-6'>
                <div className='flex justify-between items-start relative'>
                    <Avatar 
                        className='transform -translate-y-1/2 border-4 border-white'
                        alt='Test name' 
                        sx={{width:"120px", height:"120px"}}
                    />
                    <div className=''>
                    {true ? (
                        <Button 
                            variant='contained' 
                            sx={{
                                borderRadius: "20px",
                                marginTop: 2,
                            }}
                            onClick={handleOpenProfile}
                        >
                            Edit profile
                        </Button>
                    ) : (
                        <Button 
                            variant='contained' 
                            sx={{
                                borderRadius: "20px",
                                marginTop: 2, 
                            }}
                            onClick={handleflollowUser}
                        >
                            {true ? "Follow" : "Unfollow"}
                        </Button>
                    )}
                    </div>
                </div>
                <div>

                <div className='flex ietms-center mt-[-40px]'>
                    <h1 className='font-bold text-xl'>Test name</h1>
                </div>
                <h2 className='text-gray-500 text-left'>@code_name</h2>
                </div>
                <div className='mt-4 space-y-4'>
                <p className="text-left">Hello, tAh got it — if your YouTube tutorial guy is using STS, then it totally makes sense for you to use it too — especially if you're following along step-by-step and want things to look the same on your screen</p>

                    <div className='flex space-x-6'>
                        <div className='flex items-center text-gray-500 space-x-1'>
                            <BusinessCenterIcon fontSize="small"/>
                            <span>Education</span>
                        </div>
                        <div className='flex items-center text-gray-500 space-x-1'>
                            <LocationOnIcon fontSize="small"/>
                            <span>From</span>
                        </div>
                    </div>

                    <div className='flex space-x-6'>
                        <div className='flex items-center space-x-1'>
                            <span className='font-semibold'>590</span>
                            <span className='text-gray-500'>Following</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <span className='font-semibold'>50</span>
                            <span className='text-gray-500'>Followers</span>
                        </div>
                    </div>
                </div>
            </section>
      
            <section className='mt-4 border-b border-gray-100'>
                <Box sx={{ width: '100%' }}>
                    <TabContext value={tabValue}>
                        <Box>
                            <TabList 
                                onChange={handleTabChange} 
                                aria-label="profile tabs"
                                variant="fullWidth"
                                sx={{
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        color: 'rgb(83, 100, 113)',
                                        '&.Mui-selected': {
                                            color: 'rgb(15, 20, 25)',
                                        }
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'rgb(29, 155, 240)',
                                        height: '4px',
                                        borderRadius: '2px'
                                    }
                                }}
                            >
                                <Tab label="Posts" value="1" />
                                <Tab label="Replies" value="2" />
                                <Tab label="Media" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ px: 3 }}>
                            {/* Posts content */}
                        </TabPanel>
                        <TabPanel value="2" sx={{ px: 3 }}>
                            {/* Replies content */}
                        </TabPanel>
                        <TabPanel value="3" sx={{ px: 3 }}>
                            {/* Media content */}
                        </TabPanel>
                    </TabContext>
                </Box>
            </section>

            <ProfileModel handleClose={handleClose} open={openProfileModal}/>
        </div>
    )
}

export default Profile
