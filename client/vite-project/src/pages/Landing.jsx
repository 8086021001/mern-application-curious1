import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Landingnav from '../components/Landingin/Landingnav'
import Landingcontent from '../components/Landingin/Landingcontent'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Landingnav />
            <Landingcontent />

        </div>
    )
}

export default Landing