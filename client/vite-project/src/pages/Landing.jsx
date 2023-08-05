import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Button onClick={navigate('/login')}>
                click
            </Button>
        </div>
    )
}

export default Landing