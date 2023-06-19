import React from 'react'

import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const UserPublicRoutes = () => {
  let userAuth = useSelector((state) => {
    return state.authUser.authState;
  })

  return (userAuth === null ? <Outlet /> : <Navigate to='/user/home' />)
}

export default UserPublicRoutes
