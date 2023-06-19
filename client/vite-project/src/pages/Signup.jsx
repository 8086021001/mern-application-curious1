import React, { useEffect, useState } from 'react'
import FormInput from '../components/reactFormInput/FormInput'
import { Stack, Grid, Box, Typography } from "@mui/material"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, registerUserReset } from '../features/user/userSlice'
import Loader from '../components/Loader/Loader';
import TransModal from '../components/Modal/TransModal';
import GoogleBut from '../components/googleAuth/GoogleBut';

const Signup = () => {

  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [heading, setHeading] = useState("")
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate()

  const SignupState = useSelector((state) => {
    return state.user
  })

  const handleFormSubmit = (user) => {
    dispatch(registerUser(user))
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  useEffect(() => {
    if (SignupState.success) {
      setLoader(false)
      setErrMsg("Please verify your account, link has been send in your mail :", SignupState?.user?.email)

      handleModalOpen()
      setHeading(SignupState?.user?.name ?? "Hey!")
      console.log("state of modal", modalOpen)
      if (SignupState.user && modalOpen === false) {
        dispatch(registerUserReset());
        navigate('/login')
      }
    }
    if (SignupState.message) {
      setModalOpen(true)
      setErrMsg(SignupState.message)
    }
    if (SignupState.loading) {
      setLoader(true)
    }

  }, [SignupState.success, SignupState.loading])
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      {loader ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader loader={loader} />
      </div> :

        <Stack sx={{ width: "100vw", height: "100vh", backgroundColor: "#FAFAFA" }} xs={6} md={6} lg={12}>
          {modalOpen && <TransModal handleClose={handleModalClose} open={modalOpen} heading={heading} message={errMsg} />}
          <Box >
            <FormInput formatName={"Sign Up"} submitForm={handleFormSubmit} />
          </Box>
          <Typography variant='body1' sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2, px: 2
          }}>Already have an account?<RouterLink to="/login">Sign In</RouterLink></Typography>
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
            my: 1,
            width: '100%',
            textAlign: 'center'
          }}>
            <div id='signUpDiv' data-text="signup_with"></div>
          </Box>
          <GoogleBut />
        </Stack>
      }


    </>
  )
}

export default Signup