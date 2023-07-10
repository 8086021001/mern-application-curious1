import axiosInstance from "../../baseAPI/axiosBaseURL";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";




const initialState = {
    loading: false,
    success: false,
    user: {},
    editSuccess: false,
    message: "",
    errorStatus:false,
    error: ''
}


export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
    const response = await axiosInstance.post("/user/signup", user)
    const data = response.data
    return data
})

export const loginUser = createAsyncThunk('user/login',async(user,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post("/user/login",user)
        const data = response.data
        console.log(`login adt ${data}`)
        return data
    }catch(error){
        return rejectWithValue(error.response.data);
    }
   
})

export const updateUserInterests = createAsyncThunk('user/fieldUpdate',async(fields,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.put("user/setfield",fields)
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const userGoogleSignup = createAsyncThunk('user/google',async(resp,{rejectWithValue})=>{
    try {
        console.log(resp )

        const credential =  resp.credential 

        const response = await axiosInstance.post("user/googleSignup",{credential:credential})
        const data = response.data
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const userProfileUpdate = createAsyncThunk('user/profileUpdate',async(formData,{rejectWithValue})=>{
    try {
        // console.log("formdata in axios",formData)
        // for (let entry of formData.entries()) {
        //     console.log(`this is ::::::;${entry[0]}: ${entry[1]}`);
        //   }
        const response = await axiosInstance.put("user/profileUpdate",formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const userProfUpdateWithoutImage = createAsyncThunk('user/profilefieldUpdate',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.put("user/ProfilefieldUpdate",formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const setBlogAsDraft = createAsyncThunk('/user/setBlogAsDraft',async(blogId,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/setBlogAsDraft',blogId)
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})





const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        registerUserReset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = '';
        },
        logginUserReset: (state) => {
            state.loading = false;
            state.success = false;
            state.editSuccess = false
            state.errorStatus = false
            state.user = {};
            state.error = '';
        },
        userMessgeReset:(state)=>{
            state.message =""
        }
    },
    extraReducers:builder =>{
        builder.addCase(registerUser.pending,state=>{
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.user = action.payload?.user,
            state.message = action.payload?.message??""
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.code
        })
        builder.addCase(loginUser.pending,state=>{
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.user = action.payload?.user
            state.message = action.payload.message
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.errorStatus = true
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(updateUserInterests.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(updateUserInterests.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.user = action.payload?.user,
            state.message = action.payload.message
        })
        builder.addCase(updateUserInterests.rejected,(state,action)=>{
            state.loading = false
            state.errorStatus = true
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(userGoogleSignup.pending,(state)=>{
            state.loading=false
        })
        builder.addCase(userGoogleSignup.fulfilled,(state,action)=>{
            state.loading=false
            state.success = false
            state.error = ""
            state.user = action.payload?.user
            state.message = action.payload?.message
        })
        builder.addCase(userGoogleSignup.rejected,(state,action)=>{
            state.loading = false
            state.errorStatus = true
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(userProfileUpdate.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(userProfileUpdate.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.user = action.payload?.user,
            state.message = action.payload.message
        })
        builder.addCase(userProfileUpdate.rejected,(state,action)=>{
            state.loading = false
            state.errorStatus = true
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(userProfUpdateWithoutImage.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(userProfUpdateWithoutImage.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.user = action.payload?.user,
            state.message = action.payload.message
        })
        builder.addCase(userProfUpdateWithoutImage.rejected,(state,action)=>{
            state.loading = false
            state.errorStatus = true
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(setBlogAsDraft.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(setBlogAsDraft.fulfilled,(state,action)=>{
            state.loading = false,
            state.success = true,
            state.error = "",
            state.user = action.payload?.user,
            state.message = action.payload.message
        })
        builder.addCase(setBlogAsDraft.rejected,(state,action)=>{
            state.loading = false
            state.errorStatus = true
            state.error = action.error
            state.message = action.payload?.message
        })
    }
    
})



export default userSlice.reducer
export const {registerUserReset, logginUserReset,userMessgeReset} = userSlice.actions;
