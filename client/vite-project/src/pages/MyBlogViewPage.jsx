import React from 'react'
import BlogViewPage from '../components/BlogDisPage/BlogViewPage'
import MyAppBar from '../components/AppBar/MyAppBar'

const MyBlogViewPage = ({ blog }) => {
    return (
        <>
            <div>
                <MyAppBar />
                <BlogViewPage blog={blog} />
            </div>
        </>
)
}

export default MyBlogViewPage