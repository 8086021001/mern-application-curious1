import React, { useEffect, useState } from 'react'
import FormInput from '../components/reactFormInput/FormInput'
import { Stack, Grid, Box, Typography } from "@mui/material"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logginUserReset, loginUser } from '../features/user/userSlice';
import Loader from '../components/Loader/Loader';
import { setAuth } from '../features/auth/userAuth';
import GoogleBut from '../components/googleAuth/GoogleBut';







const Login = () => {

    const [loader, setLoader] = useState(false)
    const [errrMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const loginState = useSelector((state) => {
        return state.user
    })

    const handleFormSubmit = (data) => {
        dispatch(loginUser(data))

    }
    useEffect(() => {
        if (loginState.success) {
            setLoader(false)
            const interestfield = loginState.user?.interests
            if (loginState.user?.isVerified && interestfield.length > 0) {
                localStorage.setItem('user', JSON.stringify(loginState.user))
                dispatch(setAuth())
                dispatch(logginUserReset());
                navigate('/user/home')
            } else if (loginState.user?.isVerified && interestfield.length === 0) {
                // dispatch(logginUserReset());
                navigate("/interests")
            }
        }
        if (loginState.errorStatus) {
            setLoader(false)
            setErrorMsg(loginState?.message)
            dispatch(logginUserReset());
        }
        if (loginState.loading) {
            setLoader(true)
        }

    }, [loginState.success, loginState.loading, loginState.error])


    return (
        <>
            {loader ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loader loader={loader} />
            </div> :

                <Stack sx={{ width: "100vw", height: "100vh", backgroundColor: "#FAFAFA" }} xs={6} md={6} lg={12}>
                    <Box>
                        <FormInput formatName={"Sign in"} submitForm={handleFormSubmit} />
                        {errrMsg && <Typography variant="body1"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: "red",
                                my: 2, px: 2
                            }}>{errrMsg}</Typography>}
                    </Box>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '8px 0',
                        padding: '0 8px'
                    }}>
                        <RouterLink sx={{ marginX: '8px' }} to="/signin">Forgot password?</RouterLink>
                        <Typography sx={{ marginLeft: '23px' }} variant="body1">Don't have an account</Typography>
                        <RouterLink to="/signup">Sign Up</RouterLink>
                    </div>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            my: 2,
                        }}
                    >
                        <Box sx={{ width: '20%', height: '1px', bgcolor: 'black' }}></Box>
                        <Typography sx={{ px: 2 }}>Or</Typography>
                        <Box sx={{ width: '20%', height: '1px', bgcolor: 'black' }}></Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: 2,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <GoogleBut />
                    </Box>
                </Stack>
            }
        </>
    )
}


export default Login