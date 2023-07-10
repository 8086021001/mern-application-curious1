import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { clearAuth } from '../features/auth/userAuth'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import MyAppBar from '../components/AppBar/MyAppBar'
import SideBar from '../components/sideBar/SideBar'
import PostCard from '../components/PostCard/PostCard'
import SearchBar from '../components/SearchBar/SearchBar'
import { resetComments, resetSateAfterFetch } from '../features/user/blogCreateSlice'
import TextSearchBar from '../components/SearchBar/TextSearchBar'

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginState = useSelector((state) => {
        return state.authUser
    })


    console.log(loginState)
    useEffect(() => {
        dispatch(resetComments())
    }, [])

    return (
        <div>
            <MyAppBar />
            <SideBar />
            <PostCard />
        </div>
    )
}

export default Home