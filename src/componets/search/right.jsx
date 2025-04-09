import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import { Button } from '@mui/material';

const right = () => {
    const handleChnageTheme=()=>{
        console.log("Theme chnage");
    }

  return (
    <div className='py-5 sticky top-0 h-screen overflow-y-auto'>
      <div className='bg-white sticky top-0 z-10 py-2'>
        <div className='relative flex items-center bg-gray-100 rounded-full'>
          <input 
            type="text" 
            placeholder="Search"
            className='py-3 bg-transparent rounded-full text-gray-500 w-full pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-400'
          />
          <div className='absolute left-0 pl-3 pt-0'>
            <SearchIcon className='text-gray-500'/>
          </div>
        </div>
        <div className='flex justify-end mt-2'>
          <Brightness6Icon 
            className='cursor-pointer text-gray-600 hover:text-gray-800' 
            onClick={handleChnageTheme}
          />
        </div>
      </div>

      <section className='my-5 bg-gray-50 rounded-xl p-4'>
        <h1 className='text-xl font-bold'>Get Membership</h1>
        <h1 className='font-bold my-2 text-gray-600'>Subscribe for special features</h1>
        
        <Button 
          variant='contained' 
          sx={{
            padding: "10px",
            paddingX: "20px",
            borderRadius: "25px",
            bgcolor: "#1e88e5",
            textTransform: "none",
            fontWeight: "600",
            '&:hover': {
              bgcolor: "#1976d2"
            }
          }}
        >
          GET SUBSCRPTION
        </Button>
      </section>

      <section className='mt-7 space-y-4 bg-gray-50 rounded-xl p-4'>
        <h1 className='font-bold text-xl'>What's happening</h1>
        <div className='space-y-4'>
          {/* Add your trending content here */}
        </div>
      </section>
    </div>
  )
}

export default right
