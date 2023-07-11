import axiosInstance from "../../baseAPI/axiosBaseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";




const initialState = {
    loading: false,
    success: false,
    usersToconnect: [],
    message: "",
    error: '',
}


export const getAllConnections = createAsyncThunk('/getAllConnections',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/getAllConnections')
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})



const userConnectionSlice = createSlice({
    name:"interests",
    initialState,
    reducers:{

        resetUserConnection: (state) => {
            state.loading = false;
            state.success = false;
            state.usersToconnect = [];
            state.message = ""
            state.error = '';
        }
    },
    extraReducers:builder =>{
        builder.addCase(getAllConnections.pending,state=>{
            state.loading = true
        })
        builder.addCase(getAllConnections.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.usersToconnect = action.payload?.users,
            state.message = action.payload?.message??""
        })
        builder.addCase(getAllConnections.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
        })
    }
    
})


export const{
    resetUserConnection
} = userConnectionSlice.actions

export default userConnectionSlice.reducer
