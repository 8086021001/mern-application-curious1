import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from '../features/auth/userAuth';
import userReducer from '../features/user/userSlice'
import blogCreateReducer from '../features/user/blogCreateSlice'

const store = configureStore({
    reducer: {
        authUser:userAuthReducer,
        user:userReducer,
        blogCreateState:blogCreateReducer,
        
    }
})


export default store