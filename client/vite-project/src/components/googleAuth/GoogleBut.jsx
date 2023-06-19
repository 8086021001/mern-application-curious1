import React, { useEffect } from 'react'
import axiosCall from './googlecall';

const GoogleBut = () => {
    const { handleGoogle } = axiosCall();

    useEffect(() => {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
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

            // google.accounts.id.prompt()
        }
    }, [handleGoogle])
    return (
        <>
            <div id="signUpDiv" data-text="signup_with"></div>
        </>
    )
}

export default GoogleBut