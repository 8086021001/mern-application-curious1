import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from '../features/auth/userAuth';

const store = configureStore({
    reducer: {
        authUser:userAuthReducer,
    }
})


export default store