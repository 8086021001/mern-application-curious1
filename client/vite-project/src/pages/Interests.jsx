import React, { useEffect, useState } from 'react'
import InitInterests from '../components/interests/Init-interests'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInterests, logginUserReset } from "../features/user/userSlice"
import { setAuth } from '../features/auth/userAuth'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Interests = () => {

    const [errMsg, setErrorMsg] = useState("")

    const userState = useSelector((state) => {
        return state.user
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(userState)

    const submitInterest = (selectedInterest) => {
        console.log(" in parent", selectedInterest)
        dispatch(updateUserInterests(selectedInterest))
    }

    useEffect(() => {
        if (userState.success) {
            localStorage.setItem('user', JSON.stringify(userState.user))
            dispatch(setAuth())
            dispatch(logginUserReset())
            navigate('/user/home')
        } else if (userState.errorStatus) {
            setErrorMsg(userState?.message)
        }

    }, [userState.success])


    return (
        <>
            {errMsg && <Typography component="h6">{errMsg}</Typography>}
            <InitInterests handleInterestSubmit={submitInterest} />
        </>
    )
}

export default Interests