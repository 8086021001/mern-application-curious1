import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const UserBlogDisplaycard = ({ blogData }) => {

    console.log("first", blogData)

    useEffect(() => {
        if (blogData) {
            console.log(",,,,", blogData)
        }

    }, [blogData])


    return (
        <>
            {blogData && blogData.map((blog) => {
                return (
                    <Card sx={{ maxWidth: 250 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {blog.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.summary}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })

            }
        </>
    )
}

export default UserBlogDisplaycard