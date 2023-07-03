import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBlog } from '../../features/user/blogCreateSlice';
import { Padding } from '@mui/icons-material';
import './display.css'
import BlogHeader from './BlogHeader';

const BlogPage = () => {
    const { _id } = useParams();
    console.log(_id)
    const dispatch = useDispatch()
    const blogstate = useSelector(state => state.blogCreateState)
    useEffect(() => {
        dispatch(getBlog(_id))
    }, [])
    console.log("this is my sigle blog state", blogstate.blog)





    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8} lg={7}>
                    {
                        blogstate.blog &&
                        <div>
                            <BlogHeader blog={blogstate?.blog} />
                            <Box sx={{ m: 5 }}>
                                <Paper sx={{ marginTop: 2, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>
                                    <Box sx={{ marginTop: 8, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>



                                        <Stack xs={12} md={8} lg={7}>


                                            <Box sx={{ padding: 1 }}>
                                                <div id='mycontent' dangerouslySetInnerHTML={{ __html: blogstate.blog.content }}></div>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Paper>
                            </Box>
                        </div>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default BlogPage