import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const BlogCards = ({ Blogs }) => {

    const handleShowBlog = (id) => {
        console.log(id)


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

                            <Card sx={{ display: 'flex' }} onClick={() => handleShowBlog(blog?._id)}>
                                <CardContent sx={{ flex: 1 }} >
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
                                />

                            </Card>

                        </CardActionArea>
                    )
                })}
            </Grid>

        </>
    )
}

export default BlogCards