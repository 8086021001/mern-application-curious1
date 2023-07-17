import React, { useEffect } from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import StoriesPage from '../components/StoriesPage/StoriesPage'
import { useSelector } from 'react-redux'

const YourStories = () => {
    const blogData = useSelector(state => state.blogCreateState)
    useEffect(() => {

    }, [blogData.success, blogData.blogs])
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <StoriesPage />
        </>
    )
}

export default YourStories