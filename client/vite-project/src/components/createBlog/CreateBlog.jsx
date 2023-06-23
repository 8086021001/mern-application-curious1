import React, { useEffect, useRef, useState } from 'react'
import MyAppBar from '../AppBar/MyAppBar'
import { Box, Button, FormControl, Grid, InputLabel, Paper, TextField } from '@mui/material'
import Editor from '../ReactQuill/Editor';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { setSummary, setTags, setTitle, setBlog, resetBlogState, createBlog } from '../../features/user/blogCreateSlice';
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../baseAPI/axiosBaseURL';



function CreateBlog() {


    const fileInput = useRef(null)
    const dispatch = useDispatch()
    const BlogState = useSelector(state => state.blogCreateState)
    const [prevState, SetPrevState] = useState(false)
    const [htmlContent, setHtmlContent] = useState('');
    const [intersets, setInterests] = useState([]);
    const [tags, setTagings] = useState([]);


    const toastStyle = {
        background: 'white',
        color: 'red',
    };





    const HandleTags = (values) => {
        dispatch(setTags(values))
    }

    const handlePreview = () => {
        if (BlogState.Title || BlogState.summary || BlogState.content && BlogState.creatingBlog === null) {
            const blogDat = {
                title: BlogState.Title,
                summary: BlogState.summary,
                content: BlogState.content,
                tags: BlogState.tags,
                covImg: BlogState.coverImage
            }
            localStorage.setItem('blog', JSON.stringify(blogDat))
            dispatch(setBlog())
        }

        console.log("file", fileInput.current.files[0])
        console.log("bbb", BlogState?.creatingBlog?.content)
        dispatch(resetBlogState())
        SetPrevState(true)
        setHtmlContent(BlogState?.creatingBlog?.content)

    }





    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const errors = {};

        if (!BlogState.Title) {
            isValid = false;
            errors.title = 'Title is required';
        }

        if (!BlogState.summary) {
            isValid = false;
            errors.summary = 'Summary is required';
        }


        if (!BlogState.content) {
            isValid = false;
            errors.content = 'Content is required';
        }

        if (fileInput.current.files.length === 0) {
            isValid = false;
            errors.file = 'File is required';
        }

        if (!isValid) {
            console.log('Validation errors:', errors);
            Object.values(errors).forEach((errorMsg) => {
                toast.error(errorMsg);
            });

            return;
        }
        const blogData = new FormData();
        blogData.append('title', BlogState.Title);
        blogData.append('summary', BlogState.summary);
        blogData.append('content', BlogState.content);

        const file = fileInput.current.files[0];
        if (file) {
            blogData.append('coverImage', file, file?.name);
        }

        dispatch(createBlog(blogData))
    }

    // const fetchInterests = async () => {
    //     try {
    //         const response = await axiosInstance.get('/user/interests');
    //         const datas = response.data;
    //         setInterests(datas.fileds)
    //         console.log("my interests", intersets)

    //     } catch (error) {
    //         console.error('Error fetching interests:', error);
    //     }
    // };


    console.log(tags)


    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await axiosInstance.get('/user/interests');
                const data = response.data;
                console.log(data.fileds)
                const names = data.fileds?.map((field) => {
                    const nam = field.name
                    return nam
                }) || [];
                console.log("fieldss", names)

                setTagings((tags) => [...new Set([...tags, ...names])]);
                console.log(tags)
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        };

        fetchInterests();

        fetchInterests();

        if (BlogState.success) {
            console.log(BlogState.user)
            localStorage.setItem('user', JSON.stringify(BlogState.user))
            dispatch(resetBlogState())
            toast.success('Hurray!Blog publishe!')
        }

    }, [BlogState.success])




    return (
        <>
            <Grid container spacing={2}>
                <MyAppBar />
                <Grid item xs={12} sm={10} md={8} lg={7} sx={{ mx: 'auto', mt: 6 }}>
                    {prevState ? <div><div className='preview' dangerouslySetInnerHTML={{ __html: htmlContent }}>

                    </div><Button onClick={() => SetPrevState(false)}>Edit</Button></div> :

                        <Paper>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ m: 5 }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            value={BlogState.Title}
                                            InputProps={{
                                                style: {
                                                    fontSize: '2rem',
                                                    fontWeight: 'bold',
                                                }
                                            }}
                                            label="Title"
                                            id="title"
                                            multiline
                                            onChange={(e) => dispatch(setTitle(e.target.value))}
                                            sx={{ m: 2 }}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            value={BlogState.summary}
                                            label="Summary"
                                            id="Summary"
                                            multiline
                                            onChange={(e) => dispatch(setSummary(e.target.value))}
                                            sx={{ m: 2 }}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            type="file"
                                            inputRef={fileInput}
                                            id="file"
                                            sx={{ m: 2, maxWidth: 250 }}
                                        />
                                        <InputLabel htmlFor="file" shrink>
                                            Cover Image
                                        </InputLabel>

                                        <SearchBar tags={tags} handleTagValues={HandleTags} ></SearchBar>

                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 2 }}>
                                        <Editor />
                                    </FormControl>


                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button type="button" variant="contained" color="primary" onClick={handlePreview} sx={{ ml: 2 }}>
                                            Preview
                                        </Button>
                                        <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
                                            Submit
                                        </Button>
                                    </Box>

                                </Box>
                            </form>
                        </Paper>
                    }
                </Grid>
                <ToastContainer toastStyle={toastStyle} />
            </Grid >

        </>
    )
}

export default CreateBlog