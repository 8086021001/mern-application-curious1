import axiosInstance from "../../baseAPI/axiosBaseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";




const initialState = {
    loading: false,
    success: false,
    interests: [],
    message: "",
    error: '',
    userInterests:[]
}


export const getUserInterest = createAsyncThunk('user/gettingInterests',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/interests')
        const data = response.data

        return data
        
    } catch (error) {
        return rejectWithValue(error.response.data);

    }

})

export const setNewUserInterests = createAsyncThunk('user/addnewInterests',async(interests,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/addNewUserInterests',{interests:interests})
        const data = response.data
        return data
        
    } catch (error) {
        return rejectWithValue(error.response.data);

    }

})



const interestrSlice = createSlice({
    name:"interests",
    initialState,
    reducers:{

        resetInterestState: (state) => {
            state.loading = false;
            state.success = false;
            state.interests = [];
            state.message = ""
            state.error = '';
        }
    },
    extraReducers:builder =>{
        builder.addCase(getUserInterest.pending,state=>{
            state.loading = true
        })
        builder.addCase(getUserInterest.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.interests = action.payload?.fileds,
            state.message = action.payload?.message??""
        })
        builder.addCase(getUserInterest.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
        })
        builder.addCase(setNewUserInterests.pending,state=>{
            state.loading = true
        })
        builder.addCase(setNewUserInterests.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.interests = action.payload?.fileds,
            state.message = action.payload?.message??""
        })
        builder.addCase(setNewUserInterests.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action?.payload?.message
        })
    }
    
})

export default interestrSlice.reducer
export const {resetInterestState} = interestrSlice.actions;
