import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useNavigate, useMatch } from 'react-router-dom'
import { Box } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogAsDraft } from '../../features/user/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import { deleteBlog, getAllBlog, resetSateAfterFetch } from '../../features/user/blogCreateSlice';
import EditMyPublishedBlogs from '../../pages/EditMyPublishedBlogs';


const BlogCards = ({ Blogs, savedBlogs, myBlogs }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [blogId, setBlogId] = useState(null)
    const blogData = useSelector(state => state.blogCreateState)
    // const { path, params } = useMatch('editMyblogs')

    const handleOptionsClick = (blog_id) => (event) => {
        setAnchorEl(event.currentTarget);
        console.log(blog_id)
        setBlogId(blog_id)
    };

    const handleOptionsClose = () => {
        setBlogId(null)
        setAnchorEl(null);
    };
    const handleDelete = (blogId) => {
        dispatch(deleteBlog(blogId))
        handleOptionsClose();
    };

    const handleEdit = (blogId) => {
        handleOptionsClose();
        const blog = Blogs.find((blog) => blog._id === blogId)
        if (Object.keys(blog).length > 0) {
            const myBlog = JSON.stringify(blog);
            navigate("/user/editMyblogs", { state: { myBlog } })
        }
    };

    const handleShowBlog = (blog) => {
        navigate('/user/myBlogs', { state: { blog } })
    }
    const removeSavedBlog = (BlogId) => {
        const data = {
            blogId: BlogId
        }
        dispatch(setBlogAsDraft(data))
    }
    useEffect(() => {
        dispatch(resetSateAfterFetch())
        if (blogData.success) {
            dispatch(getAllBlog())
        }

    }, [Blogs, savedBlogs, myBlogs, blogData.success])

    return (
        <>

            <Grid item xs={12} md={6}>
                {Blogs.map((blog) => {
                    const createdAt = new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    });
                    return (

                        <CardActionArea sx={{ margin: 2 }} key={blog._id}>

                            <Card sx={{ display: 'flex' }} >
                                <CardContent sx={{ flex: 1 }} onClick={() => handleShowBlog(blog)} >
                                    <Typography component="h2" variant='h5'>
                                        {blog?.title}
                                    </Typography>
                                    <Typography variant='subtitle1' paragraph>
                                        Summary:{blog?.summary}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Created at: {createdAt}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        Continue reading...
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 160, display: { xs: 'none', sm: 'block' }, padding: 2 }}
                                    image={blog.coverImage}
                                    alt='/coverImage'
                                    onClick={() => handleShowBlog(blog)}
                                />
                                <Box >
                                    {savedBlogs && <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                                        <DeleteIcon onClick={() => removeSavedBlog(blog._id)} />
                                    </IconButton>}
                                    {myBlogs && <Box> <IconButton key={blog._id} sx={{ '&:hover': { backgroundColor: 'transparent' } }} onClick={handleOptionsClick(blog._id)}>
                                        <MoreVertSharpIcon />
                                    </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleOptionsClose}
                                        >
                                            <MenuItem onClick={() => handleDelete(blogId)}>
                                                <DeleteIcon sx={{ marginRight: 1 }} />
                                                Delete
                                            </MenuItem>
                                            <MenuItem onClick={() => handleEdit(blogId)}>
                                                <EditIcon sx={{ marginRight: 1 }} />
                                                Edit
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                    }
                                </Box>



                            </Card>

                        </CardActionArea>
                    )
                })}
            </Grid>

        </>
    )
}

export default BlogCards