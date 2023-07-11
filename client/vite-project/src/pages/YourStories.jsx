import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import StoriesPage from '../components/StoriesPage/StoriesPage'

const YourStories = () => {
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <StoriesPage />
        </>
    )
}

export default YourStories