import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Sidebar from '../components/sideBar/SideBar'
import UserProfileView from '../components/OtherUserprofile/UserProfileView'
import { useLocation } from 'react-router-dom'

const OtherUserProfileView = () => {
    const location = useLocation()
    const userDataFetched = location.state?.userProfileData
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <UserProfileView usedData={userDataFetched} />
        </>
    )
}

export default OtherUserProfileView