import React, { useState } from 'react'
import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography, Drawer } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';

const ChatPageComponent = () => {
    const messages = [
        { text: 'Hello', sender: true },
        { text: 'Hi there!', sender: false },
        { text: 'How are you?', sender: true },
        { text: 'I\'m good, thanks!', sender: false },
        { text: 'What have you been up to?', sender: true },
        { text: 'Just working on a new project.', sender: false },
        // Add more test messages as needed
    ];

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = () => {
        if (inputValue.trim() !== '') {
            console.log('Sending message:', inputValue);
            setInputValue('');
        }
    };

    const handleAudioRecordClick = () => {
        console.log('Recording audio...');
    };

    const handleMediaUploadClick = () => {
        console.log('Uploading media...');
    };

    const handleEmojiClick = () => {
        console.log('Opening emoji picker...');
    };


    return (
        <>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'block' },
                            marginLeft: '40px',
                            border: '2px solid black',
                            height: '100%',
                            padding: '10px',
                        }}
                    >
                        <Typography variant="h6">Chat List</Typography>
                        {/* Add chat list content here */}
                    </Box>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={false}
                        onClose={() => { }}
                    >
                        <Box sx={{ width: '200px' }}>
                            <Typography variant="h6">Chat List</Typography>
                        </Box>
                    </Drawer>
                </Grid>
                <Grid container item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Container
                        sx={{
                            border: '1px solid red',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                flex: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '10px',
                                overflowY: 'auto',
                            }}
                        >
                            {messages.map((message, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: message.sender ? 'flex-end' : 'flex-start',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: message.sender ? '#333' : '#f5f5f5',
                                            color: message.sender ? '#fff' : '#333',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            maxWidth: '70%',
                                        }}
                                    >
                                        <Typography variant="body1">{message.text}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Grid container
                            sx={{
                                border: '1px solid blue',
                                width: '100%',
                                display: 'flex',
                                overflow: 'none',
                                alignItems: 'center',
                                justifyContent: 'start',
                                padding: '10px',
                            }}

                        >

                            <Grid item xs={1}>
                                <Button onClick={handleEmojiClick}>
                                    <MoodIcon />
                                </Button>

                            </Grid>

                            <Grid item xs={8}>


                                <TextField
                                    label="Type a message"
                                    value={inputValue}
                                    fullWidth
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    sx={{ flex: '1', marginRight: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={1} >
                                <Grid sx={{ display: 'flex' }}>
                                    <Button sx={{

                                        backgroundColor: 'transparent',
                                        borderRadius: '2rem',
                                        '&:hover': {
                                            backgroundColor: 'black'
                                        }
                                    }}
                                        onClick={handleAudioRecordClick}>
                                        <MicIcon />
                                    </Button>
                                    <Button onClick={handleMediaUploadClick}>
                                        <AttachFileIcon />
                                    </Button>

                                    <Button variant="contained" onClick={handleSendClick} fullWidth endIcon={<SendIcon />} sx={{ height: '3rem', px: 8 }}>
                                        Send
                                    </Button>

                                </Grid>
                            </Grid>


                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default ChatPageComponent