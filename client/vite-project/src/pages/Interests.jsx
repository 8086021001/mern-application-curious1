import React, { useEffect, useState } from 'react'
// import InterestsField from '../components/interests/InterestsField'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInterests, logginUserReset } from "../features/user/userSlice"
import { setAuth } from '../features/auth/userAuth'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Interestsfield from '../components/interestscomp/Interestsfield'

const Interests = () => {

    const [errMsg, setErrorMsg] = useState("")

    const userState = useSelector((state) => {
        return state.user
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitInterest = (selectedInterest) => {
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
            <Interestsfield handleInterestSubmit={submitInterest} />
        </>
    )
}

export default Interests