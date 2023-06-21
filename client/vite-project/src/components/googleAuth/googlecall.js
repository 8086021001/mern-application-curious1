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

    }
    return {  handleGoogle };
  };


  export default axiosCall