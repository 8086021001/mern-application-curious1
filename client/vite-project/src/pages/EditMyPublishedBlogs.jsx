import React, { useEffect, useState } from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import EditMyBlog from '../components/createBlog/EditMyBlog'
import { useLocation } from 'react-router-dom'

const EditMyPublishedBlogs = () => {
    const [blogDataToSend, setMyBlogData] = useState(null)
    const location = useLocation()


    useEffect(() => {
        setMyBlogData(location.state?.myBlog || null);
    }, [location.state]);
    const blogData = JSON.parse(blogDataToSend)

    return (
        <>
            <MyAppBar />
            <Sidebar />
            <EditMyBlog blog={blogData} />

        </>
    )
}

export default EditMyPublishedBlogs