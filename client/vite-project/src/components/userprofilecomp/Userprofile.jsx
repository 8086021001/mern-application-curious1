import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Avatar, Button, IconButton, Container, TextField, Snackbar, Alert } from '@mui/material';
import './profile.css'
import { Badge } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import TransModal from '../Modal/TransModal';
import UserModal from '../userModal/UserModal';
// import Adduserinterests from '../interestscomp/Adduserinterests';
import { getUserInterest, setNewUserInterests } from '../../features/user/interestSlice';
import { logginUserReset, updateUserInterests, userMessgeReset } from '../../features/user/userSlice';
import { setAuth } from '../../features/auth/userAuth';
import SnackBar from '../SnackBar/SnackBar';
import BlogCards from '../PostCard/BlogCards';
import { getUserBlogs } from '../../features/user/blogCreateSlice';
import Adduserinterests from '../interestscomp/Adduserinterests';





const Userprofile = () => {
    const userState = useSelector(state => state.authUser)
    const userTempState = useSelector(state => state.user)
    // console.log('temporary state for user', userTempState)
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()
    const interestState = useSelector(state => state.interests)
    const blogState = useSelector(state => state.blogCreateState)
    // console.log('getting all blog states', blogState)

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
                <Box className='ProfileHeader' textalign="center">
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
                    <Typography borderBottom={3} boxShadow={1} variant="h4" sx={{ margin: 3 }}>Your Blogs</Typography>
                    {blogState?.useBlogs && blogState?.useBlogs.length > 0 ? <BlogCards Blogs={blogState?.useBlogs} savedBlogs={false} myBlogs={true} /> : <div className='startWriting'>
                        <Typography variant='h4'>No Blogs, lets Start writing!</Typography>
                        <Grid  >

                            <lord-icon
                                className="lotiefile"
                                src="https://cdn.lordicon.com/pqxdilfs.json"
                                trigger="hover"
                                colors="outline:#131432,primary:#606874,secondary:#08a88a,tertiary:#ebe6ef"
                                stroke="100"
                                style={{ width: "250px", height: "250px" }}
                            >
                            </lord-icon>
                        </Grid>
                    </div>}


                </Grid>
            </Grid>

            <Grid item xs={12} className='ProfileHeader'>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                        <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
                            <Typography borderBottom={1} variant="h6">Followers</Typography>
                            <Typography variant="h6">{userState.authState?.followers?.length}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                        <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Typography borderBottom={1} textAlign={'center'} variant="h6">Blogs Published</Typography>
                            <Typography variant="h6">{userState.authState?.blogsPublished?.length}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                        {/* <Container sx={{ alignItems: 'center', minWidth: '60%' }} > */}
                        <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} minWidth={'60%'}>

                            <Typography variant="h6" sx={{ m: 1 }}>Interests: {userState?.authState?.interests?.length}</Typography>

                            <Adduserinterests handleInterestchange={handleInterestInput} />
                            <Box sx={{ m: 1, width: '20%' }}>
                                <Button variant="contained" size="small" onClick={handleAddUserInterests}>
                                    Add
                                </Button>
                            </Box>
                        </Grid>

                        {/* </Container> */}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6} md={4} >
                        {/* <Box textalign="center" p={2}> */}
                        <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>

                            <Typography variant="h6">Add Interest field </Typography>
                            <Typography sx={{
                                '&:hover': {
                                    border: '5px solid white',
                                    transform: 'Scale(1.2)',
                                }
                            }} variant="body1">Create and start contibuting to the fields you are proficient</Typography>
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
                            {/* </Box> */}
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );
};

export default Userprofile;
