import React, { useEffect } from 'react';
import { Box, Typography, Button, Divider, CardActionArea, CardActions, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getAllConnections, resetFollow } from '../../features/user/userConnectionSlice';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../features/auth/userAuth';

const FriendsListPage = () => {

    const friendsConnectionState = useSelector(state => state.connection)
    const authUser = useSelector(state => state.authUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFollowRequest = (userId) => {
        console.log(userId)
        dispatch(followUser(userId))
    }

    const viewUserProfileData = (userProfileData) => {
        console.log(userProfileData)
        navigate('/user/viewUsersProfile', { state: { userProfileData } })
    }


    useEffect(() => {
        dispatch(getAllConnections())
        if (friendsConnectionState.followSuccess) {
            localStorage.setItem('user', JSON.stringify(friendsConnectionState.user))
            dispatch(setAuth())
            dispatch(resetFollow())
        }

    }, [friendsConnectionState.success, friendsConnectionState.followSuccess])

    return (
        <>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ padding: 4 }}>
                <Typography variant='h4'>People You may connect with</Typography>
            </Box>
            <Grid container spacing={2} justifyContent="center">

                {friendsConnectionState?.usersToconnect && friendsConnectionState?.usersToconnect.map((user) => {
                    return (
                        <Grid item key={user._id} xs={12} sm={6} md={4} lg={2} sx={{ margin: 2 }}>
                            <Card sx={{
                                maxWidth: 250, margin: 2, height: '100%',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    cursor: 'initial',
                                },
                            }}  >
                                <CardActionArea
                                    onClick={() => viewUserProfileData(user)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            cursor: 'initial',
                                        },
                                    }}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image={user?.image}
                                        alt={user.name}
                                    />
                                    <CardContent sx={{ height: '100%' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.about}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                                            Blogs published: {user?.blogsPublished.length}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: 2,
                                    '& button': {
                                        color: 'Black',
                                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                                        '&:hover': {
                                            color: 'white',
                                            backgroundColor: 'black',
                                            opacity: 0.6,
                                        },
                                    },
                                }}>
                                    {!authUser?.authState?.following.includes(user._id) ? (
                                        <Button size="small" color="primary" onClick={() => handleFollowRequest(user._id)}>
                                            Follow
                                        </Button>) :
                                        <Typography>
                                            Following
                                        </Typography>

                                    }
                                </CardActions>
                            </Card>
                        </Grid>

                    )

                })

                }
            </Grid >
        </>
    );
};

export default FriendsListPage;
