import React, { useEffect } from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import FriendsListPage from '../components/OtherUserprofile/FriendsListPage'
import { useDispatch } from 'react-redux'
import { resetReqSuccess, resetRequest } from '../features/user/videoCallSlice'

const UserConnections = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetRequest())

    }, [])
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <FriendsListPage />
        </>
    )
}

export default UserConnections