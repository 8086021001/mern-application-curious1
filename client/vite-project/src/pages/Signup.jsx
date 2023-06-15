import React from 'react'
import FormInput from '../components/reactFormInput/FormInput'
import GoogleBut from '../components/google_button/GoogleBut'
import { Stack, Grid, Box, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';

import { red } from '@mui/material/colors'

const Signup = () => {

  const handleFormSubmit = (data) => {
    console.log("in parent", data)
  }

  return (
    <>
      <Stack sx={{ width: "100vw", height: "100vh", backgroundColor: "#FAFAFA" }} xs={6} md={6} lg={12}>
        <Box >
          <FormInput formatName={"Sign Up"} submitForm={handleFormSubmit} />
        </Box>
        <Typography variant='body1' sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 2, px: 2
        }}>Already have an account?<RouterLink to="/signin">Sign In</RouterLink></Typography>
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
          <GoogleBut />
        </Box>

      </Stack>

    </>
  )
}

export default Signup