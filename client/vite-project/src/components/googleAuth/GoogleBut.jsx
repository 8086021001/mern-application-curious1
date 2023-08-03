import React, { useEffect } from 'react'
import axiosCall from './googlecall';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../features/auth/userAuth';
import { logginUserReset } from '../../features/user/userSlice';

const GoogleBut = () => {
    const { handleGoogle } = axiosCall();
    const userState = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.google) {
            google.accounts.id.initialize({
                // client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });

            google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
                type: "standard",
                theme: "filled_black",
                size: "large",
                text: "continue_with",
                shape: "pill",
                width: 300,
            });
            if (userState?.user && userState?.user?.googleId) {
                console.log("google id present  or", userState?.user?.googleId)
                const interest = userState?.user?.interests
                // console.log("goog", interest)


                if (interest?.length === 0) {
                    console.log("i am in googles logic")
                    dispatch(logginUserReset())
                    navigate('/interests')
                } else if (interest?.length > 0) {
                    localStorage.setItem("user", JSON.stringify(userState?.user));
                    dispatch(setAuth())
                    dispatch(logginUserReset())
                    window.location.reload()
                }
            }

            // google.accounts.id.prompt()
        }


    }, [handleGoogle, userState])
    return (
        <>
            <div id="signUpDiv" data-text="signup_with"></div>
        </>
    )
}

export default GoogleBut