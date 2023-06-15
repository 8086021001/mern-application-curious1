import React from 'react'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';


const GoogleBut = () => {
  const handleLogin = async googleData => {
    console.log(googleData.tokenId)
    try {
      const res = await axios.post(
        "http://localhost:5173",
        {
          token: googleData.tokenId
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = res.data;
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div><GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      /></div>
    </>
  )
}

export default GoogleBut