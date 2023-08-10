import React from 'react';
import { Box, Typography } from '@mui/material';
import './Contentinlanding.css';

const Landingcontent = () => {
    return (
        <Box className="content-container">
            {/* Centered Content */}
            <div className="centered-content">
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: 'h4.fontSize', sm: 'h3.fontSize', md: 'h2.fontSize' },
                    }}
                >
                    Stay curious.
                </Typography>

                <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: 'body1.fontSize', sm: 'body1.fontSize', md: 'h6.fontSize' } }}
                >
                    Discover stories, thinking, and expertise from writers on any topic. Start reading.
                </Typography>

                {/* Blinking Question Marks */}

                <Box className="blinking-question-marks2">
                    <span>?</span>
                    <span>?</span>
                    <span>?</span>
                </Box>
            </div>
        </Box>
    );
};

export default Landingcontent;
