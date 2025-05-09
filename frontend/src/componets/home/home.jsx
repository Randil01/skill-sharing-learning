import React from 'react';
import Navigation from '../navigation/navigation';
import HomeSection from '../homeSection/homeSection';
import Right from '../search/RightTemp'
import Profile from '../profile/profile'
import Progress from '../progress/Progress';
import { Route, Routes } from 'react-router-dom';
import Authentication from '../authentication/Authentication';
import Explore from '../explore/Explore';
import QnAPage from '../Q&A/Qn&aMain';
import AddQuestionForm from '../Q&A/AddQuestion';

const Homepage = () => {
  return (
    <div className='min-h-screen bg-white'>
      <div className='flex w-full'>
        {/* Left Navigation Section */}
        <div className='w-[275px] border-r border-gray-100 ml-[50px]'>
          <Navigation />
        </div>

        <div className='flex-1 min-h-screen border-r border-gray-100 max-w-[600px]'>
          <Routes>
            <Route path="/" element={<Authentication/>} />
            <Route path="/home" element={<HomeSection />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/progress/:id" element={<Progress />} />
            <Route path="/questions/:id" element={<QnAPage />} />
          </Routes>
        </div>

        {/* Right Section */}
        <div className='flex-1 max-w-[350px] pl-8 mr-[15px]'>
          <Right />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
