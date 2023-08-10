import React from 'react'
import BlogHeader from './BlogHeader'
import { Grid, Paper, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useLocation } from 'react-router-dom'
import CommentBox from '../Comments/CommentBox'

const BlogViewPage = () => {
    const location = useLocation()
    const { blog } = location.state


    return (
        <>
            <Grid xs={12} md={8} lg={8}>
                <BlogHeader blog={blog} />
                <Box sx={{ m: 5 }}>
                    <Paper sx={{ marginTop: 2, marginRight: 3, marginBottom: 4, marginLeft: 5 }}>
                        <Stack xs={12} md={8} lg={7}>

                            <Box sx={{ padding: 1 }}>
                                <div id='mycontent' dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
                            </Box>

                        </Stack>
                        <CommentBox blog={blog} />
                    </Paper>
                </Box>
            </Grid>
        </>
    )
}

export default BlogViewPage