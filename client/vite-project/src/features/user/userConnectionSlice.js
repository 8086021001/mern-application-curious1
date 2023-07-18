import axiosInstance from "../../baseAPI/axiosBaseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";




const initialState = {
    loading: false,
    success: false,
    getBlogSuccess:false,
    usersToconnect: [],
    message: "",
    error: '',
    usersBlogs:[],
    user:{},
    followSuccess:false,
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
export const getOtherUserBlogs = createAsyncThunk('/getOtherUserBlogs',async(usersID,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/user/getOtherUserBlogs/${usersID}`)
        const data = response.data
        return data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})

export const followUser = createAsyncThunk('/followUser',async(usersId,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/sendFollow',{usersID:usersId})
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
            state.usersBlogs = [];
            state.getBlogSuccess = false;
            state.followSuccess = false;
        },
        resetFollow:(state)=>{
            state.followSuccess = false;
            state.user = {}
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
        builder.addCase(getOtherUserBlogs.pending,state=>{
            state.loading = true
        })
        builder.addCase(getOtherUserBlogs.fulfilled,(state,action)=>{
            state.loading = false,
            state.getBlogSuccess = true,
            state.error = "",
            state.usersBlogs = action.payload?.usersBlogs,
            state.message = action.payload?.message??""
        })
        builder.addCase(getOtherUserBlogs.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""
        })
        builder.addCase(followUser.pending,state=>{
            state.loading = true
        })
        builder.addCase(followUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.followSuccess = true,
            state.error = "",
            state.user = action.payload?.user,
            state.message = action.payload?.message??""
        })
        builder.addCase(followUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""
        })
    }
    
})


export const{
    resetUserConnection,
    resetFollow
} = userConnectionSlice.actions

export default userConnectionSlice.reducer
