import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBlog } from '../../features/user/blogCreateSlice';
import { Padding } from '@mui/icons-material';
import './display.css'

const BlogPage = () => {
    const { _id } = useParams();
    console.log(_id)
    const dispatch = useDispatch()
    const blogstate = useSelector(state => state.blogCreateState)
    useEffect(() => {
        dispatch(getBlog(_id))
    }, [])
    console.log(blogstate.blog)





    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8} lg={7}>
                    {
                        blogstate.blog &&
                        <Box sx={{ m: 5 }}>
                            <Paper sx={{ marginTop: 2, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>
                                <Box sx={{ marginTop: 8, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>
                                    <Typography variant="h6" component="h1" className="post-card-title" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                        {blogstate.blog.title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" className="post-card-summary" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        {blogstate.blog.summary}
                                    </Typography>


                                    <Stack xs={12} md={8} lg={7}>


                                        <Box sx={{ padding: 1 }}>
                                            <div id='mycontent' dangerouslySetInnerHTML={{ __html: blogstate.blog.content }}></div>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Box>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default BlogPage