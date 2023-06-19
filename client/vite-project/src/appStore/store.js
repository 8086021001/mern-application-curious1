import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from '../features/auth/userAuth';
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer: {
        authUser:userAuthReducer,
        user:userReducer
        
    }
})


export default store