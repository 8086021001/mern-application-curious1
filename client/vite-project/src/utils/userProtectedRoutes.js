import React from "react";
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const userPublicRoutes= ()=>{
    const userAuthState = useSelector((state)=>{
        return state.authUser
    })
}