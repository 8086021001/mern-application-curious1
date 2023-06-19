import { Button } from '@mui/material'
import React from 'react'
import { clearAuth } from '../features/auth/userAuth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginState = useSelector((state) => {
        return state.authUser
    })

    console.log(loginState)
    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(clearAuth())
        navigate('/signup')
    }
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Home