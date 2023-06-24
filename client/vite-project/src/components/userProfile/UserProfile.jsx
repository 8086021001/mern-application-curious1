import React from 'react';
import { Grid, Typography, Box, Avatar, Button, IconButton } from '@mui/material';
import './profile.css'
import { Badge } from '@mui/material';
import { Edit } from '@mui/icons-material';





const UserProfile = () => {
    // Sample data for demonstration
    const user = {
        name: 'John Doe',
        profilePicture: 'profile.jpg',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        followers: 1000,
        articles: 50,
        likes: 500
    };

    const articles = [
        { title: 'Article 1', preview: 'Lorem ipsum dolor sit amet.', likes: 10 },
        { title: 'Article 2', preview: 'Consectetur adipiscing elit.', likes: 20 },
        // More article data...
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box className='ProfileHeader' textAlign="center">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                    padding: '6px',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                    },
                                }}
                            // onClick={handleModalToggle}
                            >
                                <Edit sx={{ fontSize: '18px' }} />
                            </IconButton>
                        }                    >
                        <Avatar
                            className='ProfilePicture'
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                        // onClick={handleModalToggle}
                        />
                    </Badge>
                    <Typography className='UserName' variant="h4">{user.name}</Typography>
                    <Typography className='UserBio' variant="body1">{user.bio}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box textAlign="center">
                    {/* Implement your navigation component here */}
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Followers</Typography>
                            <Typography variant="body1">{user.followers}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Articles</Typography>
                            <Typography variant="body1">{user.articles}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Likes</Typography>
                            <Typography variant="body1">{user.likes}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {articles.map(article => (
                        <Grid item xs={12} sm={6} md={4} key={article.title}>
                            <Box textAlign="center" p={2}>
                                <Typography variant="h6">{article.title}</Typography>
                                <Typography variant="body1">{article.preview}</Typography>
                                <Typography variant="body1">{article.likes} Likes</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Additional sections or components */}
            {/* Implement additional components here */}
        </Grid>
    );
};

export default UserProfile;
