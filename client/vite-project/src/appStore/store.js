import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from '../features/auth/userAuth';
import userReducer from '../features/user/userSlice'
import blogCreateReducer from '../features/user/blogCreateSlice'
import interestReducer from '../features/user/interestSlice'
import userConnectionReducer from '../features/user/userConnectionSlice'

const store = configureStore({
    reducer: {
        authUser:userAuthReducer,
        user:userReducer,
        blogCreateState:blogCreateReducer,
        interests:interestReducer,
        connection:userConnectionReducer,
        
    }
})


export default store