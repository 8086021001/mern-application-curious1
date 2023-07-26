import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import MeetRequests from '../components/MeetRequest/MeetRequest'

const MeetRequestPage = () => {
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <MeetRequests />
        </>
    )
}

export default MeetRequestPage