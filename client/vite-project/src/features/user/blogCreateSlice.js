import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    creatingBlog: false,
    Title: '',
    summary: '',
    coverImage:{},
    content: '',
    tags: [],
}


const blogCreateSlice = createSlice({
    name:'blogCreate',
    initialState,
    reducers:{
        setCreatingBlog: (state, action) => {
            state.creatingBlog = action.payload;
        },
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
        resetBlogState:(state)=>{
            state.creatingBlog = false
            state.Title = ''
            state.summary = ''
            state.coverImage = {}
            state.content = ''
            state.tags = []
        }

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
} = blogCreateSlice.actions;

export default blogCreateSlice.reducer
