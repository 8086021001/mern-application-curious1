import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import VideoCall from '../components/VideoCallRoom/VideoCall'

const VideoCallRoom = () => {
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <VideoCall />
        </>
    )
}

export default VideoCallRoom