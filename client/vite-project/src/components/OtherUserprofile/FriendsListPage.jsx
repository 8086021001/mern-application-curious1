import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { wrap } from 'lodash';
import { grid } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConnections } from '../../features/user/userConnectionSlice';

const FriendsListPage = () => {

    const friendsConnectionState = useSelector(state => state.connection)
    const dispatch = useDispatch()
    const handleFollowRequest = () => {

    }


    useEffect(() => {
        dispatch(getAllConnections())

    }, [friendsConnectionState.success])

    return (
        <>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ padding: 2 }}>
                <Typography variant='h4'>People You may connect with</Typography>
            </Box>
            <Box display="flex" flexDirection="row" flex={wrap} alignItems="center" gap={4} margin={4}>
                {friendsConnectionState?.usersToconnect?.map((friend) => (
                    <Box
                        key={friend._id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width={200}
                        p={2}
                        my={2}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <img
                                src={friend.image}
                                alt={friend.name}
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                }}
                            />
                            <Box flex={1}>
                                <Typography variant="body" flexGrow={1}>{friend.name}</Typography>
                            </Box>
                            <Button onClick={handleFollowRequest} variant="contained" color="primary" sx={{ '&:hover': { backgroundColor: '#1565c0' } }}>
                                Follow
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default FriendsListPage;
