import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import ChatPageComponent from '../components/Chat/ChatPageComponent'

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