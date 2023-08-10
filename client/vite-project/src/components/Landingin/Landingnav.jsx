import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Grow, Grid } from '@mui/material';
import './Contentinlanding.css';
import { useNavigate } from 'react-router-dom';


const Landingnav = () => {
    const navigate = useNavigate()
    const handleSignInClick = () => {
        navigate('/login');
    };
    const handleSignupClick = () => {
        navigate('/signup');

    }

    return (
        <AppBar position="static" style={{ backgroundColor: '#fcba03', height: '80px', borderBottom: 3 }}>
            <Toolbar sx={{ borderBottom: 5 }}>
                <Grid sx={{ flexGrow: 1 }}>
                    <Typography variant="h3" style={{ color: 'black' }}>
                        ? Curious
                    </Typography>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "right", width: "30%" }}>

                    <Grow in={true}>
                        <Button sx={{ backgroundColor: "black", borderRadius: 5, width: '30%', margin: 2, color: 'inherit' }} onClick={handleSignInClick} >Sign in</Button>
                    </Grow>
                    <Grow in={true}>
                        <Button sx={{ backgroundColor: "black", borderRadius: 5, width: '30%', margin: 2, color: 'inherit' }} onClick={handleSignupClick}>Get started</Button>
                    </Grow>
                </Grid>
            </Toolbar>
        </AppBar >
    );
};

export default Landingnav;
