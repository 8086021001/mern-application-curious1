import axiosInstance from "../../baseAPI/axiosBaseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading:false,
    reqCallSuccess:false,
    UpdSuccess:false,
    callData:{},
    message: "",
    error: '',
}



export const scheduleVideoCall = createAsyncThunk('/scheduleVideoCall',async(reqUserId,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/scheduleVideoCall',{reqUserId})
        const data = response.data
        return data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})

export const fetchAlRequests = createAsyncThunk('/fetchAlRequests',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/fetchAlRequests')
        const data = response.data
        return data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})


export const updateReqUpdate = createAsyncThunk('/updateReq',async(reqDat,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/updateReq',{reqDat})
        const data = response.data
        return data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})



const userConnectionSlice = createSlice({
    name:"videoCall",
    initialState,
    reducers:{

        resetRequest: (state) => {
            state.loading = false;
            state.reqCallSuccess = false;
            state.callData = {};
            state.error = "";
            state.message = ""

        },
        resetReqSuccess:(state)=>{
            state.reqCallSuccess = false;

        },
        resetUpdSuccess:(state)=>{
            state.UpdSuccess = false
        }
    },
    extraReducers:builder =>{
        builder.addCase(scheduleVideoCall.pending,state=>{
            state.loading = true
        })
        builder.addCase(scheduleVideoCall.fulfilled,(state,action)=>{
            state.loading = false,
            state.reqCallSuccess = true,
            state.error = "",
            state.callData = action.payload?.users,
            state.message = action.payload?.message??""
        })
        builder.addCase(scheduleVideoCall.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""

        })
        builder.addCase(fetchAlRequests.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchAlRequests.fulfilled,(state,action)=>{
            state.loading = false,
            state.reqCallSuccess = true,
            state.error = "",
            state.callData = action.payload?.reqData,
            state.message = action.payload?.message??""
        })
        builder.addCase(fetchAlRequests.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""

        })
        builder.addCase(updateReqUpdate.pending,state=>{
            state.loading = true
        })
        builder.addCase(updateReqUpdate.fulfilled,(state,action)=>{
            state.loading = false,
            state.UpdSuccess = true,
            state.error = "",
            state.message = action.payload?.message??""
        })
        builder.addCase(updateReqUpdate.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
            state.message = action.payload?.message??""

        })
    }
})


export const{
    resetRequest,
    resetReqSuccess,
    resetUpdSuccess
} = userConnectionSlice.actions

export default userConnectionSlice.reducer