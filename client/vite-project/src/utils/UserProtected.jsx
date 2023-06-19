import React from 'react'

import { Navigate, Outlet } from "react-router-dom"
import Login from "../pages/Login"
import { useSelector } from "react-redux"

const UserProtected = () => {

  let userAuth = useSelector((state) => {
    return state.authUser.authState
  })
  return (userAuth ? <Outlet /> : <Navigate to='/' />)
}

export default UserProtected



