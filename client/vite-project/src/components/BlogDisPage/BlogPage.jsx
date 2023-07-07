import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBlog } from '../../features/user/blogCreateSlice';
import { Padding } from '@mui/icons-material';
import './display.css'
import BlogHeader from './BlogHeader';
import CommentBox from '../Comments/CommentBox';

const BlogPage = () => {
    const { _id } = useParams();
    const dispatch = useDispatch()
    const blogstate = useSelector(state => state.blogCreateState)
    const blogDat = blogstate.blog
    useEffect(() => {
        dispatch(getBlog(_id))
    }, [])





    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8} lg={8}>
                    {
                        blogstate.blog &&
                        <div>
                            <BlogHeader blog={blogstate?.blog} />
                            <Box sx={{ m: 4 }}>
                                {console.log("This is blog i m looking for", blogstate?.blog)}
                                <Paper sx={{ marginTop: 2, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>
                                    <Box sx={{ marginTop: 8, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>



                                        <Stack xs={12} md={8} lg={7}>


                                            <Box sx={{ padding: 1 }}>
                                                <div id='mycontent' dangerouslySetInnerHTML={{ __html: blogstate.blog.content }}></div>
                                            </Box>
                                        </Stack>
                                    </Box>
                                    <CommentBox blog={blogDat} />
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