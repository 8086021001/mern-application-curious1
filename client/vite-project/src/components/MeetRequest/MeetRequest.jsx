import { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { VideoCall } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlRequests, resetReqSuccess, resetUpdSuccess, updateReqUpdate } from '../../features/user/videoCallSlice';
import { Box } from '@mui/system';
import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom';
import "./MeetReq.css"


const styles = {
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        padding: '20px',
        width: '100%',
    },
    cardHeader: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        borderRadius: '10px 10px 0 0',
        padding: '20px',
    },
    videoIcon: {
        backgroundColor: "black",
        color: '#00bfa5',
        borderRadius: 2,
        width: '85px'
    },

};

const MeetRequests = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const currentTime = new Date().getTime();



    const reqData = useSelector(state => state.videoCall)

    const authUser = useSelector(state => state.authUser)
    const authUserId = authUser?.authState?._id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        console.log(selectedDate)
    };
    const handleMakeMeet = (roomId) => {
        console.log("received video call id", roomId)
        socket.emit('join-vc-room', { roomId, authUserId })
    }
    const handleRoomJoined = useCallback(({ roomId }) => {
        console.log("hey room joined @%", roomId)
        navigate(`/user/vc/${roomId}`)
    }, [])

    const handleReqbut = async (reId, update) => {
                if (update === "accepted" && selectedDate === "") {
            return alert("please select a date")
        }
        const reqDat = {
            reId,
            update,
            selectedDate
        }
        dispatch(updateReqUpdate(reqDat))
    }

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined)

        return () => {
            socket.off('joined-room', handleRoomJoined)
        }

    }, [socket])


    useEffect(() => {
        if (!reqData.reqCallSuccess) {
            dispatch(fetchAlRequests())
        }

    }, [reqData?.reqCallSuccess, reqData?.callData])

    useEffect(() => {

        if (reqData?.UpdSuccess) {
            dispatch(fetchAlRequests())
            dispatch(resetUpdSuccess())
        }
    }, [reqData?.UpdSuccess])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '50%' }}>
                <h1 style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                    Meet Requests
                </h1>
                {reqData?.callData.length > 0 && reqData?.callData.map((userReq) => (

                    <>

                        <Card sx={styles.card} key={userReq._id}>
                            {userReq?.sender?._id !== authUser?.authState?._id ? (

                                <CardHeader
                                    avatar={<Avatar alt="User" src={userReq?.sender.image} />}
                                    title={userReq?.sender?.name}
                                    sx={styles.cardHeader}
                                />
                            ) : (


                                <div>

                                    <Typography>Your request to</Typography>
                                    {userReq?.users.map((user) => (
                                        <>
                                            {user?._id !== authUser?.authState?._id &&

                                                <CardHeader
                                                    avatar={<Avatar alt="User" src={user?.image} />}
                                                    title={user?.name}
                                                    sx={styles.cardHeader}
                                                />
                                            }
                                        </>
                                    ))

                                    }

                                </div>

                            )
                            }
                            <CardContent>

                                {userReq.status === "accepted" &&

                                    <div style={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
                                        {new Date(userReq?.scheduledTime).getTime() <= currentTime ? (


                                            <div>
                                                <Button onClick={() => handleMakeMeet(userReq?._id)} sx={styles.videoIcon}>
                                                    <VideoCall />
                                                </Button>

                                            </div>
                                        ) : (
                                            <Typography variant='h6'>Meeting scheduled on : {new Date(userReq?.scheduledTime).getUTCDate()} at {new Date(userReq?.scheduledTime).getHours()}:{new Date(userReq?.scheduledTime).getMinutes()}</Typography>
                                        )
                                        }

                                    </div>
                                }
                                {userReq?.sender?._id !== authUser?.authState?._id ?
                                    (
                                        <div>
                                            {userReq?.status === 'pending' &&


                                                <div>
                                                    <Button sx={{
                                                        width: '25%',
                                                        backgroundColor: 'green',
                                                        color: 'white'
                                                    }} onClick={() => handleReqbut(userReq?._id, "accepted")}>
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            width: '25%',
                                                            backgroundColor: 'Red',
                                                            color: 'white'
                                                        }}
                                                        onClick={() => handleReqbut(userReq?._id, "rejected")}>
                                                        Reject
                                                    </Button>
                                                    {userReq.status === "pending" &&
                                                        <input type="datetime-local" className='dateInput' value={selectedDate} onChange={handleDateChange} style={{ borderRadius: '10px', border: 'none', padding: '10px' }} />
                                                    }

                                                </div>
                                            }
                                        </div>
                                    ) : (
                                        <Box>
                                            <Typography>
                                                .
                                            </Typography>
                                        </Box>
                                    )

                                }
                                <Typography variant='h6'>{userReq?.status}</Typography>

                            </CardContent>
                        </Card>
                    </>

                ))

                }
            </div>
        </div>
    );
};



export default MeetRequests;
