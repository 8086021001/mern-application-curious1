import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';

import Signup from './pages/Signup'
import Login from './pages/Login'
import Notfound from './pages/Notfound';

import.meta.env


function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<Notfound />} />
      </Routes>

    </>
  )
}

export default App
