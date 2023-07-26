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
    searchSuccess:false,
    searchUsers:[],
    fetchChatSuccess:false,
    chatData:[],
    fetchAllChatSuccess:false,
    allChatData:[],
    sendAudio:{},
    sendAudioSuccess:false,
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


export const searchAllUsers = createAsyncThunk('searchAllUsers',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/searchAllUsers')
        const data = response.data
        return data
        
    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})

export const fetchChatData = createAsyncThunk('fetchChatData',async(chatId,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/user/fetchChatData/${chatId}`);
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})
export const fetchAllChatdat = createAsyncThunk('/fetchAllChatdat',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/fetchAllChatdat')
        const data = response.data
        return data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})
export const sendAudio = createAsyncThunk('/user/sendAudio',async(audio,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/sendAudio', audio, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        const data = response.data
        return data
        
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const userConnectionSlice = createSlice({
    name:"connection",
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
        },
        resetFetchChat:(state)=>{
            state.fetchChatSuccess = false;
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
        builder.addCase(searchAllUsers.pending,state=>{
            state.loading = true
        })
        builder.addCase(searchAllUsers.fulfilled,(state,action)=>{
            state.loading = false,
            state.searchSuccess = true,
            state.error = "",
            state.searchUsers = action.payload?.users,
            state.message = action.payload?.message??""
        })
        builder.addCase(searchAllUsers.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""
        })
        builder.addCase(fetchChatData.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchChatData.fulfilled,(state,action)=>{
            state.loading = false,
            state.fetchChatSuccess = true,
            state.error = "",
            state.chatData = action.payload?.chat,
            state.message = action.payload?.message??""
        })
        builder.addCase(fetchChatData.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""
        })
        builder.addCase(fetchAllChatdat.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchAllChatdat.fulfilled,(state,action)=>{
            state.loading = false,
            state.fetchAllChatSuccess = true,
            state.error = "",
            state.allChatData = action.payload?.chatUsers,
            state.message = action.payload?.message??""
        })
        builder.addCase(fetchAllChatdat.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""
        })
        builder.addCase(sendAudio.pending,state=>{
            state.loading = true
        })
        builder.addCase(sendAudio.fulfilled,(state,action)=>{
            state.loading = false,
            state.sendAudioSuccess = true,
            state.error = "",
            state.sendAudio = action.payload?.audioMessage,
            state.message = action.payload?.message??""
        })
        builder.addCase(sendAudio.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""
        })
    }
    
})


export const{
    resetUserConnection,
    resetFollow,
    resetFetchChat
} = userConnectionSlice.actions

export default userConnectionSlice.reducer




