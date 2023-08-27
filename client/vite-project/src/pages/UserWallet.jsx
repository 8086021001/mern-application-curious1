import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Wallet from '../components/wallet/Wallet'
import RazorPay from '../components/RazorPay/RazorPay'
import Sidebar from '../components/sideBar/SideBar'

const UserWallet = () => {
    return (
        <>
            <MyAppBar />
            <Sidebar />
            <Wallet />
        </>
    )
}

export default UserWallet