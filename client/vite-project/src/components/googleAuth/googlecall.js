import { useState } from "react";
import { setAuth } from "../../features/auth/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { logginUserReset, userGoogleSignup } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


const axiosCall = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const userState = useSelector(state=>state.user)
    const navigate = useNavigate()

  
    const handleGoogle = async (response) => {
        setLoading(true);

        dispatch(userGoogleSignup(response))
        .then(()=>{
          console.log("goog",userState)

          const interest = userState?.user?.interests
          console.log("goog",interest)

          if(interest.length===0){
            dispatch(logginUserReset())
            navigate('/interests')
          }else{
            localStorage.setItem("user", JSON.stringify(userState?.user));
            navigate('/user/home')
          }
        })
    }
    //     fetch(url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    
    //       body: JSON.stringify({ credential: response.credential }),
    //     })
    //       .then((res) => {
    //         setLoading(false);
    //         return res.json();
    //       })
    //       .then((data) => {
    //         if (data?.user) {
              

    //           const userState = useSelector(state=>state.user)
    //           console.log(userState)

    //           const interestfield = userState?.interests
    //           if (loginState.user?.isVerified && interestfield.length > 0) {
    //               localStorage.setItem('user', JSON.stringify(loginState.user))
    //               dispatch(setAuth())
    //               navigate('/user/home')
    //           } else if (loginState.user?.isVerified && interestfield.length === 0) {
    //               navigate("/interests")
    //           }
    //         localStorage.setItem("user", JSON.stringify(data?.user));
    //         dispatch(setAuth())

    //         }

    //         throw new Error(data?.message || data);
    //       })
    //       .catch((error) => {
    //         setError(error?.message);
    //       });
    // };
    return {  handleGoogle };
  };


  export default axiosCall