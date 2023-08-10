import React, { useEffect, useState } from 'react';
import { Typography, Button, Grid, Chip, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Divider } from '@mui/material';
import { Box, borderBottom, display, grid } from '@mui/system';
import { Chat, VideoCall, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getOtherUserBlogs, resetFollow, resetUserConnection } from '../../features/user/userConnectionSlice';
import UserBlogDisplaycard from './UserBlogDisplaycard';
import { setAuth } from '../../features/auth/userAuth';
import { useNavigate } from 'react-router-dom';
import { resetRequest, scheduleVideoCall } from '../../features/user/videoCallSlice';

const UserProfileView = ({ usedData }) => {
    const [activeTab, setActiveTab] = useState("home")
    const dispatch = useDispatch()
    const usersBlogData = useSelector(state => state.connection)
    const useAuth = useSelector(state => state.authUser)
    const navigate = useNavigate()
    // console.log(usersBlogData?.usersBlogs[0], "hererere")

    const videoCallReq = useSelector(state => state.videoCall)

    const handleFollowFunction = (userIdtoFollow) => {
        // console.log(userIdtoFollow)
        dispatch(followUser(userIdtoFollow))
    }
    const handeChat = (chatuserId) => {
        // console.log(chatuserId)
        navigate('/user/chat')

    }


    const handleActiveTab = (tab) => {
        setActiveTab(tab)
        if (tab === "home") {
            console.log(activeTab)
        }
        if (tab === "about") {
            console.log(activeTab)
        }
    }


    const handleMeetRequest = (meetUserId) => {
        dispatch(scheduleVideoCall(meetUserId))
    }


    useEffect(() => {

        if (usedData) {
            dispatch(getOtherUserBlogs(usedData._id))

        }
        if (usersBlogData.followSuccess) {
            localStorage.setItem('user', JSON.stringify(usersBlogData.user))
            dispatch(setAuth())
            dispatch(resetFollow())
        }

        if (videoCallReq?.reqCallSuccess) {
            dispatch(resetRequest())
            navigate('/user/meetReq')
        } else if (videoCallReq?.error) {
            console.log("Unable to create request")
        }

    }, [usedData, usersBlogData.getBlogSuccess, usersBlogData.followSuccess, videoCallReq?.reqCallSuccess])

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
                                backgroundImage: `url(${usedData?.image})`,
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
                                <img src={usedData?.image} alt="User" style={{ width: '100px', height: '100px' }} />
                                <Typography variant="h5">{usedData?.name}</Typography>
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
                                marginTop: 5,
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
                                width: '100%',
                                margin: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {activeTab === "home" &&
                                <Grid >
                                    <UserBlogDisplaycard blogData={usersBlogData?.usersBlogs[0]?.blogsPublished}></UserBlogDisplaycard>
                                </Grid>
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
                            backgroundColor: '#dfe6e0'
                        }}
                    >
                        {/* Profile Image and Details */}
                        <Box p={2} display='flex' flexDirection='column' alignItems='center'>
                            <img src={usedData?.image} alt="Profile" style={{ width: '150px', height: '150px' }} />
                            <Typography variant="h6">{usersBlogData?.usersBlogs[0]?.name}</Typography>
                            <Typography variant="h6">Email: {usersBlogData?.usersBlogs[0]?.email}</Typography>
                        </Box>

                        {/* Follow Button */}
                        <Box p={2}>
                            {useAuth?.authState?.following.includes(usersBlogData?.usersBlogs[0]?._id) ? (
                                <>
                                    <Box display='flex' justifyContent='center'>
                                        <button onClick={() => handleFollowFunction(usersBlogData?.usersBlogs[0]?._id)} style={{ width: "10rem", padding: '10px 20px' }}>Unfollow</button>
                                    </Box>
                                    <Box display='flex' justifyContent='space-around' margin={2} gap={2} >
                                        <Button onClick={() => handeChat(usersBlogData?.usersBlogs[0]?._id)} variant='outlined' color='info' size='medium' sx={{
                                            width: '15rem'
                                        }}>
                                            <Typography> Chat </Typography>

                                            <Chat></Chat>
                                        </Button>
                                        <Button variant='outlined' color='info' size='medium' onClick={() => handleMeetRequest(usersBlogData?.usersBlogs[0]?._id)} sx={{
                                            width: '15rem'
                                        }}>
                                            <VideoCall></VideoCall>

                                            <Typography> Book a meet </Typography>
                                        </Button>

                                    </Box>

                                </>) :
                                <button onClick={() => handleFollowFunction(usersBlogData?.usersBlogs[0]?._id)} style={{ padding: '10px 20px' }}>Follow</button>
                            }
                        </Box>
                    </Box>
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
                            backgroundColor: '#dfe6e0'

                        }}
                    >
                        <Typography variant='h5'>Following</Typography>

                        {usersBlogData?.usersBlogs[0]?.following.length > 0 &&
                            usersBlogData?.usersBlogs[0]?.following.map((users) => (
                                <List key={users?._id}
                                    sx={{
                                        width: '100%', maxWidth: 360, bgcolor: 'background.paper',
                                        margin: 0.5,
                                        borderBottom: '1px solid black',
                                        '&:hover': { cursor: 'pointer', backgroundColor: '#ebebeb' }
                                    }}

                                >
                                    <ListItem alignItems="flex-start" >
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={users?.image} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={users?.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {users?.email}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />

                                </List>
                            ))


                        }

                    </Box>
                </Grid>

            </Grid >



        </>
    );
};

export default UserProfileView;
