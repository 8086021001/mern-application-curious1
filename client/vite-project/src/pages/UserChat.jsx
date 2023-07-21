import React, { useEffect } from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import ChatPageComponent from '../components/Chat/ChatPageComponent'
import { socket } from '../socket'
import { useSelector } from 'react-redux'
import ChatUserList from '../components/Chat/ChatUserList'

const UserChat = () => {




    return (
        <>
            <MyAppBar />
            {/* <Sidebar /> */}
            <ChatPageComponent />
        </>
    )
}

export default UserChat