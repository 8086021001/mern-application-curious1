import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import FriendsListPage from '../components/OtherUserprofile/FriendsListPage'

const UserConnections = () => {
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <FriendsListPage />
        </>
    )
}

export default UserConnections