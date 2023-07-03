import React from 'react'
import BlogViewPage from '../components/BlogDisPage/BlogViewPage'

const MyBlogViewPage = ({ blog }) => {
    return (
        <>
            <div>
                {console.log(blog)}
                <BlogViewPage blog={blog} />
            </div>
        </>
    )
}

export default MyBlogViewPage