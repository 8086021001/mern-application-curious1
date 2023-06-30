import React from 'react'
import BlogPage from '../components/BlogDisPage/BlogPage'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'

const BlogViePage = () => {
    return (
        <div>
            <MyAppBar />
            <Sidebar />
            <BlogPage />
        </div>
    )
}

export default BlogViePage