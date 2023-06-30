import { Alert, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';


const SnackBar = ({ message, severity, duration = 5000 }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(!!message);
    }, [message]);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, duration);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [open, duration]);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar



