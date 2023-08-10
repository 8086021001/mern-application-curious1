import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const BlogHeader = ({ blog }) => {
    return (
        <>
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    marginTop: 4,
                    backgroundImage: `url(${blog?.coverImage.replace('\\', '/').replace(' ', '%20')})`
                }}
            >
                {/* <img src={blog.coverImage} alt='/ser' /> */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {blog.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {blog.summary}
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>

            </Paper >
        </>
    )
}

export default BlogHeader