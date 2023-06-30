import { Avatar, Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { modalStyles } from './modalStyle'
import { Stack, color } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Scale, Transform } from '@mui/icons-material';
import { logginUserReset, userProfUpdateWithoutImage, userProfileUpdate } from '../../features/user/userSlice';
import { setAuth } from '../../features/auth/userAuth';

const UserModal = ({ open, onClose }) => {
  const fileInputRef = useRef(null);
  const userState = useSelector(state => state.authUser)
  const [imageFile, setImageFile] = useState(null)
  const [userName, setName] = useState(userState?.authState?.name)
  const [phone, setPhone] = useState(userState?.authState?.phone ?? null)
  const [password, setPassword] = useState(null)
  const dispatch = useDispatch()
  const updatingUserState = useSelector(state => state.user)
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file)
      console.log("state1", imageFile)

    }
  };
  const handleSubmit = () => {
    const formData = new FormData();

    let hasChanges = false;

    if (userName && userName !== userState?.authState?.name) {
      formData.append('name', userName);
      hasChanges = true;
    }
    if (phone && phone !== userState?.authState?.phone) {
      formData.append('phone', phone);
      hasChanges = true;
    }
    if (password) {
      formData.append('password', password);
      hasChanges = true;
    }
    if (imageFile) {
      formData.append('image', imageFile);
      hasChanges = true;
    }
    console.log(hasChanges)
    for (let entry of formData.entries()) {
      console.log(`${entry[0]}: ${entry[1]}`);
    }
    if (hasChanges && imageFile) {

      dispatch(userProfileUpdate(formData))
    } else if (hasChanges && !imageFile) {
      console.log('i am here')
      dispatch(userProfUpdateWithoutImage(formData))
    }

  }

  console.log("state of image", imageFile)
  useEffect(() => {
    if (updatingUserState.success) {
      localStorage.setItem('user', JSON.stringify(updatingUserState.user))
      dispatch(setAuth())
      dispatch(logginUserReset())
    }


  }, [updatingUserState.success])


  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Grid item xs={10} sm={8} lg={6} xl={6}>
          <Container sx={modalStyles.wrapper}>
            <Typography variant="h1" sx={{ color: 'white', fontSize: 30, padding: 2 }}>Edit profile</Typography>
            <Box >

              {imageFile ? (
                <Avatar
                  alt="User Avatar"
                  src={URL.createObjectURL(imageFile)}
                  sx={{
                    width: 150, height: 150, border: '#1976D2', cursor: 'pointer', borderRadius: 0, marginLeft: '8px',
                    transition: 'transform 0.3s ',
                    '&:hover': {
                      border: '1px solid white',
                      transform: 'Scale(1.2)',
                    },
                  }}
                  onClick={handleAvatarClick}
                />
              ) : (
                <Avatar
                  alt="A"
                  src={userState?.authState?.image ?? null}
                  sx={{
                    width: 150, height: 150, border: '#1976D2', cursor: 'pointer', borderRadius: 0, marginLeft: '8px',
                    transition: 'transform 0.3s ',
                    '&:hover': {
                      border: '1px solid white',
                      transform: 'Scale(1.2)',
                    },
                  }}
                  onClick={handleAvatarClick}
                />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Box>
            <Box sx={modalStyles.inputFields} >

              <Grid>
                <label htmlFor="username" style={{ color: 'white' }}>Username:</label>
                <input
                  placeholder={userName}
                  onChange={(e) => { setName(e.target.value) }}
                />
              </Grid>
              <Grid>
                <label htmlFor="Phone " style={{ color: 'white' }}>Phone:</label>
                <input
                  placeholder={phone}
                  onChange={(e) => { setPhone(e.target.value) }}
                />

              </Grid>
              {!userState?.authState?.googleId &&
                <Grid>
                  <label htmlFor="Phone " style={{ color: 'white' }}>Password:</label>
                  <input
                    placeholder={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </Grid>
              }


            </Box>
            <Box>
              <Button sx={modalStyles.buttons} onClick={handleSubmit} >
                submit
              </Button>
            </Box>

          </Container>
        </Grid>
      </Modal>
    </>
  )
}

export default UserModal