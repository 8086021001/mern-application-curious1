import React from "react";
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
import Home from "../pages/Home";

const PublicRoutes = ()=>{
    const userAuthState = useSelector((state)=>{
        return state.authUser
    })
    return (!userAuthState? <Outlet/>:<Navigate to={Home}/>)
}

export default PublicRoutes





