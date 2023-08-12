import React, { useEffect } from 'react'
import BlogPage from '../components/BlogDisPage/BlogPage'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import { useDispatch } from 'react-redux'
import { userMessgeReset } from '../features/user/userSlice'

const BlogViePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userMessgeReset())
    }, [])
    return (
        <div>
            <MyAppBar />
            <Sidebar />
            <BlogPage />
        </div>
    )
}

export default BlogViePage