import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../baseAPI/axiosBaseURL";


const initialState = {
    creatingBlog: JSON.parse(localStorage.getItem('blog')) ? JSON.parse(localStorage.getItem('blog')) : null,
    Title: '',
    summary: '',
    coverImage:{},
    content: '',
    tags: [],
    loading:false,
    success:false,
    user:{},
    message:'',
    error:'',
    blogData:{},
    blog:{},
    useBlogs:{},
    comments:[]
}





export const createBlog = createAsyncThunk('/user/createBlog',async(blogDat,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/createBlog', blogDat, {
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


export const getAllBlog = createAsyncThunk('/getAllBlog',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/getAllBlog')
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getBlog =createAsyncThunk('/getBlog',async(_id,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/user/getBlog/${_id}`)
        const data = response.data
        return data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getUserBlogs = createAsyncThunk('/getUserBlogs',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/user/getUserBlogs')
        const data = response.data
        return data

    } catch (error) {
        return rejectWithValue(error.response.data);

    }
})


export const MakeBlogComment = createAsyncThunk('/user/setuserComment',async(content,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post('/user/MakeBlogComment',{content:content})
        const data = response.data
        return data 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const GetBlogComment = createAsyncThunk('/user/getuserComment',async(blogId,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/user/getBlogComment/${blogId}`)
        const data = response.data
        return data 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const blogCreateSlice = createSlice({
    name:'blogCreate',
    initialState,
    reducers:{
        setTitle: (state, action) => {
            state.Title = action.payload;
        },
        setSummary: (state, action) => {
            state.summary = action.payload;
        },
        setCoverImage: (state, action) => {
            state.coverImage = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setBlog:(state)=>{
            state.creatingBlog = JSON.parse(localStorage.getItem('blog'))
        },
        clearBlog:(state)=>{
            state.creatingBlog = null
            localStorage.removeItem('blog')
        },
        resetBlogState:(state)=>{
            state.creatingBlog = null
            state.Title = ''
            state.summary = ''
            state.coverImage = {}
            state.content = ''
            state.tags = []
            state.loading = false
            state.success = false
            state.message = ''
            state.error = ''
        },
        resetSateAfterFetch:(state)=>{
            state.success = false
            state.message = ''
            state.error = ''
        },
        resetComments:(state)=>{
            state.success = false
            state.message = ''
            state.comments = []
        }


    },
    extraReducers:builder=>{
        builder.addCase(createBlog.pending,state=>{
            state.loading = true
        })
        builder.addCase(createBlog.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.user = action.payload?.user;
            state.message = action.payload?.message
        })
        builder.addCase(createBlog.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(getAllBlog.pending,state=>{
            state.loading = true
        })
        builder.addCase(getAllBlog.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.blogData = action.payload?.blogs;
            state.message = action.payload?.message
        })
        builder.addCase(getAllBlog.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error
            state.message = action.payload?.message
        })
        builder.addCase(getBlog.pending,state=>{
            state.loading = true
        })
        builder.addCase(getBlog.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.blog = action.payload?.blogCont;
            state.message = action.payload?.message??"success"
        })
        builder.addCase(getBlog.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error
            state.message = action.payload?.message??"failed"
        })
        builder.addCase(getUserBlogs.pending,state=>{
            state.loading = true
        })
        builder.addCase(getUserBlogs.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.useBlogs = action.payload?.userBlogs;
            state.message = action.payload?.message??"success"
        })
        builder.addCase(getUserBlogs.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error
            state.message = action.payload?.message??"failed"
        })
        builder.addCase(MakeBlogComment.pending,state=>{
            state.loading = true
        })
        builder.addCase(MakeBlogComment.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.comments = action.payload?.comments;
            state.message = action.payload?.message??"success"
        })
        builder.addCase(MakeBlogComment.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error
            state.message = action.payload?.message??"failed"
        })
        builder.addCase(GetBlogComment.pending,state=>{
            state.loading = true
        })
        builder.addCase(GetBlogComment.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.comments = action.payload?.comments;
            state.message = action.payload?.message??"success"
        })
        builder.addCase(GetBlogComment.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error
            state.message = action.payload?.message??"failed"
        })


    }
})

export const {
    setCreatingBlog,
    setTitle,
    setSummary,
    setCoverImage,
    setContent,
    setTags,
    resetBlogState,
    clearBlog,
    setBlog,
    resetSateAfterFetch,
    resetComments
} = blogCreateSlice.actions;

export default blogCreateSlice.reducer
