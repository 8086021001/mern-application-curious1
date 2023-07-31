import { Avatar, Box, Card, CardContent, Divider, Drawer, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserSearch from '../SearchBar/UserSearch'
import { height } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllChatdat, fetchChatData, resetFetchChat } from '../../features/user/userConnectionSlice'
import { socket } from '../../socket'

const ChatUserList = () => {
    const [searchUsers, setSearchUsers] = useState([])
    const [chatedUsers, setChatedUsers] = useState([])
    const [searchKeyWord, setSearchKeyWord] = useState("")
    const dispatch = useDispatch()
    const chatStatus = useSelector(state => state.connection)
    const authUserStatus = useSelector(state => state.authUser)

    const searchedUsers = useSelector(state => state.connection)

    const userList = searchedUsers?.searchUsers?.following
    const userListCount = searchedUsers?.searchUsers?.following


    let matchingUsers


    const handleSearchedUsers = (searchKey) => {
        setSearchKeyWord(searchKey)
    }

    const handleUsersToChat = (user, userId) => {
        if (user) {
            //may be a chance of
            const isPresent = chatedUsers.includes(user)
            if (!isPresent) {
                setChatedUsers(prevSatate => [...prevSatate, user])
            }
        }
        // console.log("id of user to chat", userId)
        dispatch(fetchChatData(userId))
    }

    useEffect(() => {

        if (searchKeyWord === "") {
            setSearchUsers([]);
        }
        if (searchKeyWord !== "" && userListCount && userListCount.length > 0) {
            matchingUsers = searchedUsers?.searchUsers?.following.filter((user) => {
                return user.name.toLowerCase().includes(searchKeyWord.toLowerCase())
            })
            setSearchUsers(matchingUsers)
        }

    }, [searchKeyWord])

    const fetchChatAndJoinRoom = (chatData) => {
        socket.emit("setup", chatData)


    }



    useEffect(() => {
        if (!chatStatus.fetchAllChatSuccess) {

            dispatch(fetchAllChatdat())
        }

        if (chatStatus.fetchAllChatSuccess) {
            const authUserId = authUserStatus?.authState._id
            const chatedUser = chatStatus?.allChatData.map(item => item?.users.find(obj => {
                if (obj._id !== authUserId) {
                    return obj
                }

            }))


            setChatedUsers(chatedUser)

        }


    }, [chatStatus.fetchAllChatSuccess])

    useEffect(() => {
        if (chatStatus.fetchChatSuccess) {
            // console.log("this is the real id", chatStatus?.chatData[0]?._id)
            const authUserId = authUserStatus?.authState?._id
            const chatroomId = chatStatus?.chatData[0]?._id
            const chatData = {
                authUserId,
                chatroomId
            }
            fetchChatAndJoinRoom(chatData)
            dispatch(resetFetchChat())
        }

    }, [chatStatus.fetchChatSuccess])


    return (

        <>

            <Box
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'block' },
                    // border: '2px solid black',
                    height: '90vh',
                    padding: '4px',
                    width: '100%',
                }}
            >
                <Box display='flex' justifyContent='center'>

                    <Typography variant="h6">Chat List</Typography>
                </Box>

                <UserSearch handleAvailableUsers={handleSearchedUsers} />
                <Box>


                    <List sx={{ width: '100%', maxWidth: 300, }}>
                        {searchUsers && searchUsers.length > 0 &&
                            searchUsers.map((users) => (

                                <ListItem key={users._id} alignItems="flex-start"
                                    onClick={() => handleUsersToChat(users, users._id)}

                                    sx={{
                                        boxShadow: "0px 0px 4px ",
                                        borderRadius: 10,
                                        marginInline: 1,
                                        marginBlock: 1,
                                        cursor: 'pointer'
                                    }}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={users.image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={users.name}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    online
                                                </Typography>

                                            </>
                                        }
                                    />

                                </ListItem>
                            ))
                        }

                        {!searchKeyWord && chatedUsers &&

                            chatedUsers.map((users) => (
                                <ListItem key={users._id} alignItems="flex-start"
                                    onClick={() => handleUsersToChat(users === undefined, users._id)}

                                    sx={{
                                        boxShadow: "0px 0px 4px ",
                                        borderRadius: 10,
                                        marginInline: 1,
                                        marginBlock: 1,
                                        cursor: 'pointer'
                                    }}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={users.image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={users.name}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    online
                                                </Typography>

                                            </>
                                        }
                                    />

                                </ListItem>
                            ))


                        }
                    </List>

                </Box>

            </Box>



        </>
    )
}

export default ChatUserList