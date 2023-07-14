import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Avatar, Button, IconButton, Container, TextField, Snackbar, Alert } from '@mui/material';
import './profile.css'
import { Badge } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import TransModal from '../Modal/TransModal';
import UserModal from '../userModal/UserModal';
import AddUserInterests from '../Interests/addUserInterests';
import { getUserInterest, setNewUserInterests } from '../../features/user/interestSlice';
import { logginUserReset, updateUserInterests, userMessgeReset } from '../../features/user/userSlice';
import { setAuth } from '../../features/auth/userAuth';
import SnackBar from '../SnackBar/SnackBar';
import BlogCards from '../PostCard/BlogCards';
import { getUserBlogs } from '../../features/user/blogCreateSlice';





const UserProfile = () => {
    const userState = useSelector(state => state.authUser)
    const userTempState = useSelector(state => state.user)
    // console.log('temporary state for user', userTempState)
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()
    const interestState = useSelector(state => state.interests)
    const blogState = useSelector(state => state.blogCreateState)
    console.log('getting all blog states', blogState)

    // console.log(userState)
    const [userSelctedInterests, setUserInterests] = useState(null)
    const [addNewInterestValue, setaddInterestValue] = useState('')


    const handleModalToggle = () => {
        setModalOpen(true)
    }
    const handleAddUserInterests = () => {
        if (userSelctedInterests) {
            dispatch(updateUserInterests(userSelctedInterests))

        }
    }
    const handleInterestInput = (interests) => {
        if (interests) {
            setUserInterests(interests)
        }
    }
    const handleAddNewInterests = () => {
        if (addNewInterestValue) {

            dispatch(setNewUserInterests(addNewInterestValue))
        }
    }
    useEffect(() => {
        if (!interestState.success) {
            dispatch(userMessgeReset())
        }
        dispatch(getUserInterest())
        dispatch(getUserBlogs())


    }, [interestState.success])

    useEffect(() => {
        if (userTempState.success) {
            if (userTempState?.user) {
                localStorage.setItem('user', JSON.stringify(userTempState.user))
                dispatch(setAuth())
                dispatch(logginUserReset())
            }
        }

    }, [userTempState.success])







    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {modalOpen && <UserModal open={modalOpen} onClose={() => setModalOpen(false)} />}
                {userTempState.message &&
                    <SnackBar message={userTempState.message} severity={'warning'} />
                }
                {
                    interestState.message &&
                    <SnackBar message={interestState.message} severity={'warning'} />

                }
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
                                    borderRadius: 5,
                                    padding: '4px',
                                    '&:hover': {
                                        backgroundColor: '#1976D2',
                                    },
                                }}
                                onClick={handleModalToggle}
                            >
                                <Edit sx={{ fontSize: '18px' }} />
                                <span style={{ marginLeft: '2px', fontSize: '12px', padding: 3 }}>Edit</span>

                            </IconButton>
                        }                    >
                        <Avatar
                            className='ProfilePicture'
                            alt="Remy Sharp"
                            src={userState.authState.image}
                            sx={{
                                width: 150, height: 150, border: '#1976D2', cursor: 'pointer', marginLeft: '8px',
                                transition: 'transform 0.3s ',
                                '&:hover': {
                                    border: '5px solid white',
                                    transform: 'Scale(1.2)',
                                },
                            }}
                        // onClick={handleModalToggle}
                        />
                    </Badge>
                    <Typography className='UserName' variant="h4">{userState.authState.name}</Typography>
                    <Typography className='UserBio' variant="body1">{userState.authState.email}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h4" sx={{ margin: 3 }}>Your Blogs</Typography>
                    {blogState?.useBlogs && blogState?.useBlogs.length > 0 ? <BlogCards Blogs={blogState?.useBlogs} savedBlogs={false} myBlogs={true} /> : <div>No posts</div>}


                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Followers</Typography>
                            <Typography variant="body1">{userState.authState?.followers?.length}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Box textAlign="center">
                            <Typography variant="h6">Blogs Published</Typography>
                            <Typography variant="body1">{userState.authState?.blogsPublished?.length}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Container textAlign="center" sx={{ alignItems: 'center' }}>

                            <Typography variant="h6" sx={{ m: 1 }}>Interests: {userState?.authState?.interests?.length}</Typography>
                            <AddUserInterests handleInterestchange={handleInterestInput} />
                            <Box sx={{ m: 1, width: '20%' }}>
                                <Button variant="contained" size="small" onClick={handleAddUserInterests}>
                                    Add
                                </Button>
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6} md={4} >
                        <Box textAlign="center" p={2}>
                            <Typography variant="h6">Add Interest field </Typography>
                            <Typography variant="body1">Create and start contibuting to the fields you are proficient</Typography>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                noValidate
                                autoComplete="on"
                            >
                                <div>
                                    <TextField
                                        label="Add interests"
                                        id="outlined-size-small"
                                        defaultValue="Small"
                                        size="small"
                                        value={addNewInterestValue}
                                        onChange={(e) => setaddInterestValue(e.target.value)}
                                    />
                                </div>
                                <Box sx={{ m: 1, width: '20%' }}>
                                    <Button variant="contained" size="small" onClick={handleAddNewInterests} >
                                        Add
                                    </Button>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );
};

export default UserProfile;
