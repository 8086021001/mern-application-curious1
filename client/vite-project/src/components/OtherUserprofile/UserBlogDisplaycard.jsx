import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EllipsisText = ({ text, maxLines }) => {
    return (
        <div
            style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: maxLines,
            }}
        >
            {text}
        </div>
    );
};

const UserBlogDisplaycard = ({ blogData }) => {
    const navigate = useNavigate()

    const handleBlogView = (blogId) => {
        navigate(`/user/viewBlog/${blogId}`)
    }


    useEffect(() => {
        if (blogData) {
            console.log("blogData,,,,",)
        }

    }, [blogData])


    return (
        <>
            <Grid container display={'flex'} justifyContent={'center'} spacing={2}>

                {blogData && blogData.map((blog) => {
                    return (
                        <Grid key={blog._id} item xs={12} sm={6} md={4} lg={4}>

                            <Card sx={{
                                // maxWidth: 250,
                                width: '80%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                                onClick={() => handleBlogView(blog?._id)}
                            >
                                <CardActionArea sx={{
                                    '&:hover': {
                                        backgroundColor: "#ebebeb"
                                    }
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="div" borderBottom={1} >

                                            <EllipsisText text={blog.title} maxLines={3} />

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" >
                                            <EllipsisText text={blog.summary} maxLines={5} />
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })

                }
            </Grid>
        </>
    )
}

export default UserBlogDisplaycard