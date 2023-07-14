import React, { useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useDispatch } from 'react-redux';
import { setBlogAsDraft } from '../../features/user/userSlice';
import EditIcon from '@mui/icons-material/Edit';


const BlogCards = ({ Blogs, savedBlogs, myBlogs }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOptionsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        // Handle the delete action
        // ...
        handleOptionsClose();
    };

    const handleEdit = () => {
        // Handle the edit action
        // ...
        handleOptionsClose();
    };

    const handleShowBlog = (blog) => {
        console.log(blog)
        navigate('/user/myBlogs', { state: { blog } })
    }
    const removeSavedBlog = (BlogId) => {
        const data = {
            blogId: BlogId
        }
        dispatch(setBlogAsDraft(data))
    }

    return (
        <>

            <Grid item sx={12} md={6}>
                {Blogs.map((blog) => {
                    const createdAt = new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    });
                    return (

                        <CardActionArea sx={{ margin: 3 }}>

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
                                <Box>
                                    {savedBlogs && <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                                        <DeleteIcon onClick={() => removeSavedBlog(blog._id)} />
                                    </IconButton>}
                                    {myBlogs && <Box> <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }} onClick={handleOptionsClick}>
                                        <MoreVertSharpIcon />
                                    </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleOptionsClose}
                                        >
                                            <MenuItem onClick={handleDelete}>
                                                <DeleteIcon sx={{ marginRight: 1 }} />
                                                Delete
                                            </MenuItem>
                                            <MenuItem onClick={handleEdit}>
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