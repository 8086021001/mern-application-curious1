import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login'
import Notfound from './pages/Notfound';
import Home from './pages/Home';
import Interests from './pages/Interests';
import Signup from './pages/Signup.jsX';

import Landing from './pages/Landing';
import UserPublicRoutes from './utils/UserPublicRoutes';
import UserProtected from './utils/UserProtected';
import CreateBlog from './components/createBlog/CreateBlog';
import Profile from './pages/Profile';
import BlogViePage from './pages/BlogViePage';



import.meta.env


function App() {
  return (
    <>
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
        </Route >

        <Route path='*' element={<Notfound />} />
      </Routes >

    </>
  )
}

export default App
