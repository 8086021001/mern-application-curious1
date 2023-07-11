import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { Box, display, grid } from '@mui/system';
import { Visibility } from '@mui/icons-material';

const UserProfileView = () => {
    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Box display="flex" justifyContent="center">
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            border={1}
                            sx={{
                                width: '100%',
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                p={2}
                                sx={{
                                    borderBottom: '2px solid transparent',
                                    transition: 'border-bottom-color 0.3s ease',
                                    '&:hover': {
                                        borderBottomColor: '#000',
                                    },
                                }}
                            >
                                <img src="user_image.jpg" alt="User" style={{ width: '100px', height: '100px' }} />
                                <Typography variant="h6">User Name</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" py={2}>
                        <Box
                            p={1}
                            mx={1}
                            sx={{
                                borderBottom: '2px solid transparent',
                                transition: 'border-bottom-color 0.3s ease',
                                '&:hover': {
                                    borderBottomColor: '#000',
                                },
                            }}
                        >
                            <Typography variant="subtitle1">Home</Typography>
                        </Box>
                        <Box
                            p={1}
                            mx={1}
                            sx={{
                                borderBottom: '2px solid transparent',
                                transition: 'border-bottom-color 0.3s ease',
                                '&:hover': {
                                    borderBottomColor: '#000',
                                },
                            }}
                        >
                            <Typography variant="subtitle1">About</Typography>
                        </Box>
                    </Box>

                    {/* Content */}
                    <Box p={2}>
                        <Typography variant="body1">Content goes here</Typography>
                    </Box>


                </Grid>
                <Grid item xs={12} md={5}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        border={1}
                        sx={{
                            width: '100%',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* Profile Image and Details */}
                        <Box p={2}>
                            <img src="profile_image.jpg" alt="Profile" style={{ width: '150px', height: '150px' }} />
                            <Typography variant="h6">Profile Details</Typography>
                        </Box>

                        {/* Follow Button */}
                        <Box p={2}>
                            <button style={{ padding: '10px 20px' }}>Follow</button>
                        </Box>
                    </Box>
                </Grid>

            </Grid >



        </>
    );
};

export default UserProfileView;
