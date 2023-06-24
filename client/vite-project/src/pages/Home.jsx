import { Button } from '@mui/material'
import React from 'react'
import { clearAuth } from '../features/auth/userAuth'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import MyAppBar from '../components/AppBar/MyAppBar'
import SideBar from '../components/sideBar/SideBar'
import PostCard from '../components/PostCard/PostCard'

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginState = useSelector((state) => {
        return state.authUser
    })

    console.log(loginState)

    return (
        <div>
            <MyAppBar />
            <SideBar />
            <PostCard />
        </div>
    )
}

export default Home