import React from 'react'
import MyAppBar from '../components/AppBar/MyAppBar'
import Wallet from '../components/wallet/Wallet'
import RazorPay from '../components/RazorPay/RazorPay'

const UserWallet = () => {
    return (
        <>
            <MyAppBar />
            <Wallet />
            <RazorPay />
        </>
    )
}

export default UserWallet