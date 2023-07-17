import React, { useEffect, useState } from 'react';
import { Typography, Button, Grid, Chip } from '@mui/material';
import { Box, display, grid } from '@mui/system';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserBlogs, resetUserConnection } from '../../features/user/userConnectionSlice';
import UserBlogDisplaycard from './UserBlogDisplaycard';

const UserProfileView = ({ usedData }) => {
    const [activeTab, setActiveTab] = useState("home")
    const dispatch = useDispatch()
    const usersBlogData = useSelector(state => state.connection)
    console.log(usersBlogData?.usersBlogs[0]?.blogsPublished, "hererere")


    const handleActiveTab = (tab) => {
        setActiveTab(tab)
        if (tab === "home") {
            console.log(activeTab)
        }
        if (tab === "about") {
            console.log(activeTab)
        }
    }
    useEffect(() => {

        if (usedData) {
            dispatch(getOtherUserBlogs(usedData._id))

        }

    }, [usedData, usersBlogData.getBlogSuccess])

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
                                width: '80%',
                                margin: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundImage: `url(${usedData.image})`,
                                backgroundSize: 'cover',

                            }}

                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                p={2}
                                sx={{
                                    borderBottom: '2px solid transparent',
                                    backgroundColor: '#edeff2',
                                    transition: 'border-bottom-color 0.3s ease',
                                    '&:hover': {
                                        borderBottomColor: '#000',
                                    },
                                }}
                            >
                                <img src={usedData.image} alt="User" style={{ width: '100px', height: '100px' }} />
                                <Typography variant="h5">{usedData.name}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box display="flex" justifyContent="center" alignItems="center" py={2}
                            sx={{
                                borderBottom: '3px solid black',

                                width: '80%',
                                margin: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                p={1}
                                mx={1}
                                sx={{
                                    borderBottom: '2px solid transparent',
                                    backgroundColor: "#ede9df",

                                    transition: 'border-bottom-color 0.3s ease',
                                    '&:hover': {
                                        borderBottomColor: '#000',
                                        cursor: 'pointer'

                                    },
                                }}
                                onClick={() => handleActiveTab("home")}
                            >
                                <Typography variant="subtitle1">Blogs</Typography>
                            </Box>
                            <Box
                                p={1}
                                mx={1}
                                sx={{
                                    backgroundColor: "#ede9df",
                                    borderBottom: '2px solid transparent',
                                    transition: 'border-bottom-color 0.3s ease',
                                    '&:hover': {
                                        borderBottomColor: '#000',
                                        cursor: 'pointer'
                                    },
                                }}
                                onClick={() => handleActiveTab("about")}
                            >
                                <Typography variant="subtitle1">About</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="center">


                        <Box p={2}
                            sx={{
                                width: '80%',
                                margin: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {activeTab === "home" &&
                                <Box>
                                    {console.log(usersBlogData?.usersBlogs[0]?.blogsPublished)}
                                    <UserBlogDisplaycard blogData={usersBlogData?.usersBlogs[0]?.blogsPublished}></UserBlogDisplaycard>
                                </Box>
                            }
                            {activeTab === "about" &&
                                <Box>
                                    <Box display="flex" justifyContent="center" p={2}>

                                        <Typography variant='h6' marginLeft={3} marginRight={3}>
                                            About :
                                        </Typography>
                                        <Typography variant='h6'>
                                            {usersBlogData?.usersBlogs[0]?.about}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" p={2}>
                                        <Typography variant='h6' marginLeft={3} marginRight={3}>
                                            Field of interests:
                                        </Typography>
                                        {usersBlogData?.usersBlogs[0]?.interests.map((intrests) => {
                                            return (

                                                <Chip key={intrests._id} label={intrests.name} color="primary" sx={{ backgroundColor: "black", color: 'white', mx: 1 }} />
                                            )
                                        })}
                                    </Box>
                                </Box>
                            }
                        </Box>
                    </Box>

                </Grid>
                <Grid item xs={12} md={5}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        border={1}
                        marginTop={3}
                        sx={{
                            marginTop: 3,
                            marginRight: 3,
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* Profile Image and Details */}
                        <Box p={2}>
                            <img src={usedData?.image} alt="Profile" style={{ width: '150px', height: '150px' }} />
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
