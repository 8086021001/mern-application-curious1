import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Grid, IconButton, Stack, TextField, Typography, Drawer, Card, CardContent, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MoodIcon from '@mui/icons-material/Mood';
import ChatUserList from './ChatUserList';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket'
import AudioButton from '../AudioButton/AudioButton';
import { resetAudiState, resetImageState, sendAudio, sendImage } from '../../features/user/userConnectionSlice';
import ImageButton from '../AudioButton/ImageButton';
import Particle from '../particle/Particle';
import zIndex from '@mui/material/styles/zIndex';

const ChatPageComponent = () => {


    const [inputValue, setInputValue] = useState('');
    const [selectedChat, setselectedChat] = useState(false)
    const [chatDataId, setchatDataId] = useState('')
    const [mySocketId, setmySocketId] = useState(undefined)
    const [messageLoading, setmessageLoading] = useState(false)
    const [fetchedMessages, setfetchedMessages] = useState([])
    const [audio, setAudio] = useState(null);
    const [imageFile, setImageFile] = useState(null)
    const [audioData, setAudioData] = useState(null)
    const dipatch = useDispatch()

    const chatDataState = useSelector(state => state.connection)
    const authState = useSelector(state => state.authUser)
    const authUserId = authState?.authState?._id
    const messagesEndRef = useRef(null)



    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = () => {
        if (inputValue.trim() !== '') {
            const chatData = {
                chatDataId,
                inputValue,
                authUserId
            }
            socket.emit('send message', chatData, (response) => {
                setfetchedMessages(prevState => [...prevState, response])
            })
            setInputValue('');

        }
    };



    const handleMediaUploadClick = (mediaFile) => {
        if (mediaFile) {
            console.log('Uploading media...', mediaFile);
            setImageFile(mediaFile)

        }

    };

    const handleEmojiClick = () => {
        console.log('Opening emoji picker...');
    };


    const handleAudioFile = (audioFile) => {
        if (audioFile) {
            setAudio(audioFile)
        }
    }

    useEffect(() => {
        socket.on("connected", (arg) => {
            setmySocketId(arg)
        })
        socket.on("receive Message", (messageData) => {
            // if (socketId !== mySocketId) {
            //   console.log("Received message:", messageData);
            // //   displayReceivedMessage(messageData);
            // }
            console.log("Received message:", messageData);
            setfetchedMessages(prevState => [...prevState, messageData])

        });
        socket.on('receive-audio', (audioData) => {
            setfetchedMessages(prevState => [...prevState, audioData])
        })

        socket.on('receive-image', (imgData) => {
            setfetchedMessages(prevState => [...prevState, imgData])

        })


        return () => {
            socket.off("connected");
            socket.off("receive Message");
            socket.off("receive-audio")
            socket.off('receive-image')
        };
    }, [])

    useEffect(() => {
        if (chatDataState?.chatData) {

            if (chatDataState.chatData.length === 0) {
                console.log("Hey Chat data empty", chatDataState.chatData)
                setselectedChat(true)
            } else {
                console.log("Hey Chat data is not empty", chatDataState?.chatData[0]?._id)
                setselectedChat(false)
                setchatDataId(chatDataState?.chatData[0]?._id)
                setmessageLoading(true)
                socket.emit("fetch all messages", chatDataId, (response) => {
                    setfetchedMessages(response)
                })
            }
        }
        if (audio && chatDataId && imageFile === null) {
            const formData = new FormData()
            formData.append("chat", chatDataId)
            formData.append('sender', authUserId)
            formData.append('content', audio)
            formData.append('isAudio', true)
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            dipatch(sendAudio(formData))
            setAudioData(formData)
            setAudio(null)
        }
        if (imageFile && chatDataId && audio === null) {
            const imageForm = new FormData()
            imageForm.append("chat", chatDataId)
            imageForm.append('sender', authUserId)
            imageForm.append('content', imageFile)
            imageForm.append('isImage', true)
            dipatch(sendImage(imageForm))
            setImageFile(null)
        }

        if (chatDataState?.sendAudioSuccess) {

            setfetchedMessages(prevState => [...prevState, chatDataState?.sendAudio])
            socket.emit("sent-audio", chatDataState?.sendAudio, chatDataId)
            setAudioData(null)
            dipatch(resetAudiState())
        }

        if (chatDataState?.sendImageSuccess) {
            setfetchedMessages(prevState => [...prevState, chatDataState?.sendImage])
            socket.emit("sent-image", chatDataState?.sendImage, chatDataId)
            dipatch(resetImageState())
        }
        return () => {
            socket.off("sent-image")
        }


    }, [chatDataState.chatData, chatDataId, audio, imageFile, chatDataState?.sendAudioSuccess, chatDataState?.sendImageSuccess])


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });


    }, [fetchedMessages]);



    return (
        <>

            <Grid container spacing={2} display='flex' justifyContent='center'>

                <Grid item xs={11} sm={11} md={2} lg={2} xl={2} m={1} marginTop={2}  >
                    <Box
                        sx={{
                            border: '1px solid red',
                            height: '98%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: "0px 0px 9px "

                        }}
                    >


                        <ChatUserList />
                    </Box>
                </Grid>

                {!selectedChat &&

                    <Grid container item xs={12} sm={12} md={8} lg={8} xl={8} m={1} marginTop={2}>
                        <Box
                            sx={{
                                borderBottom: '1px solid red',
                                height: '90%',
                                width: '60%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: "0px 0px 9px ",
                                position: 'absolute'

                            }}
                        >
                            <Box
                                sx={{
                                    margin: 2

                                }}
                            >
                                <Avatar alt="" />
                            </Box>



                            <Box
                                sx={{
                                    flex: '1',
                                    display: 'flex',
                                    borderBottom: '5px solid black',
                                    flexDirection: 'column',
                                    height: '100%',
                                    padding: '10px',
                                    position: 'relative',
                                    overflowY: 'auto',
                                    backgroundColor: '#f0eee9',
                                    zIndex: 1
                                }}
                            >
                                <Particle chatDat={selectedChat} />


                                {fetchedMessages.map((message, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: message.senderId == authUserId ? 'flex-end' : 'flex-start',
                                            marginBottom: '10px',
                                            position: 'relative',

                                            zIndex: 1

                                        }}
                                    >

                                        <Box>

                                            <Box
                                                sx={{
                                                    backgroundColor: message.senderId == authUserId ? '#333' : '#FFFFFF',
                                                    color: message.senderId === authUserId ? '#FFFFFF' : '#333333',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                {message?.isAudio === true && (
                                                    <div className="audio-container">
                                                        <audio src={message.content} controls></audio>
                                                        {/* <a download href={message.content}>
                                                        Download Recording
                                                    </a> */}
                                                    </div>
                                                )
                                                }
                                                {message?.isImage === true && (
                                                    <div>
                                                        <img src={message.content} alt="Image" style={{ maxWidth: '100%', height: 'auto' }} />
                                                    </div>
                                                )

                                                }
                                                {message?.isText === true && (
                                                    <Typography variant="body1">{message?.content}</Typography>
                                                )

                                                }

                                            </Box>
                                            <Typography variant="body2" color="textSecondary"
                                                sx={{
                                                    textAlign: 'right'
                                                }}
                                            >{message.createdAt}</Typography>

                                        </Box>
                                    </Box>
                                ))}
                                <div ref={messagesEndRef} />


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
                                        <AudioButton handleAudio={handleAudioFile} />
                                        <ImageButton handleImageUploading={handleMediaUploadClick} />

                                        {/* <Button onClick={handleMediaUploadClick}>
                                        <AttachFileIcon />
                                    </Button> */}

                                        <Button variant="contained" onClick={handleSendClick} fullWidth endIcon={<SendIcon />} sx={{ height: '3rem', px: 8 }}>
                                            Send
                                        </Button>

                                    </Grid>
                                </Grid>


                            </Grid>


                        </Box>

                    </Grid>
                }
                {selectedChat &&
                    <Grid container item xs={12} sm={12} md={8} lg={8} xl={8} m={1} marginTop={2} maxHeight={'46vh'}>
                        <Particle chatDat={selectedChat} />

                    </Grid>
                }

            </Grid >
        </>
    )
}

export default ChatPageComponent

