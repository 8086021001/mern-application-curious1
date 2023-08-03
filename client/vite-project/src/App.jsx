import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Notfound from './pages/Notfound';
import Home from './pages/Home';
import Interests from './pages/Interests';
import Signup from './pages/Signup.jsx';
import Landing from './pages/Landing';
import UserPublicRoutes from './utils/UserPublicRoutes';
import UserProtected from './utils/UserProtected';
import CreateBlog from './components/createBlog/CreateBlog';
import Profile from './pages/Profile';
import BlogViePage from './pages/BlogViePage';
import MyBlogViewPage from './pages/MyBlogViewPage';
import YourStories from './pages/YourStories';
import UserProfileView from './components/OtherUserprofile/UserProfileView';
import UserConnections from './pages/UserConnections';
import EditMyPublishedBlogs from './pages/EditMyPublishedBlogs';
import OtherUserProfileView from './pages/OtherUserProfileView';
import UserChat from './pages/UserChat';
import { socket } from './socket';
import MeetRequestPage from './pages/MeetRequestPage';
import VideoCallRoom from './pages/VideoCallRoom';
import { PeerProvider } from './features/user/peer';
import UserWallet from './pages/UserWallet';





function App() {
  useEffect(() => {
    socket.connect()
  })



  return (
    <>
      <PeerProvider>

        <Routes>

          <Route path='/*' element={<UserPublicRoutes />}>
            < Route index element={<Landing />} />
            <Route exact path='signup' element={<Signup />} />

            <Route exact path='login' element={<Login />} />
            <Route exact path='interests' element={<Interests />} />

          </Route>


          <Route path='/user/*' element={<UserProtected />}>
            < Route exact path='home' element={<Home />} />
            <Route path='CreateBlog' element={<CreateBlog />} />
            <Route path='profile' element={<Profile />} />
            <Route path='viewBlog/:_id' element={<BlogViePage />} />
            <Route path='myBlogs' element={<MyBlogViewPage />} />
            <Route path='stories' element={<YourStories />} />
            <Route path='profileView' element={<UserProfileView />} />
            <Route path='connections' element={<UserConnections />} />
            <Route path='editMyblogs' element={<EditMyPublishedBlogs />} />
            <Route path='viewUsersProfile' element={<OtherUserProfileView />} />
            <Route path='chat' element={<UserChat />} />
            <Route path='meetReq' element={<MeetRequestPage />} />
            <Route path='vc/:id' element={<VideoCallRoom />} />
            <Route path='wallet' element={<UserWallet />} />

          </Route >

          <Route path='*' element={<Notfound />} />
        </Routes >
      </PeerProvider>


    </>
  )
}

export default App
