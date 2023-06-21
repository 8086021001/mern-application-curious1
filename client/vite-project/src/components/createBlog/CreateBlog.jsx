import React, { useEffect, useRef, useState } from 'react'
import MyAppBar from '../AppBar/MyAppBar'
import { Box, Button, FormControl, Grid, Paper, TextField } from '@mui/material'
import Editor from '../ReactQuill/Editor';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { setSummary, setTags, setTitle } from '../../features/user/blogCreateSlice';

function CreateBlog() {


    const fileInput = useRef(null)
    const tags = ['Option 1', 'Option 2', 'Option 3', 'Helloo']
    const dispatch = useDispatch()
    const BlogState = useSelector(state => state.blogCreateState)






    const HandleTags = (values) => {
        dispatch(setTags(values))
    }

    const handlePreview = () => {


    }



    useEffect(() => {


    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(BlogState)
        console.log('Title:', BlogState.Title);
        console.log('Summary:', BlogState.summary);
        console.log("files", BlogState.coverImage)
        console.log('CONTEN:', BlogState.content);
        console.log(fileInput.current.files[0])

    }
    return (
        <>
            <Grid container spacing={2}>
                <MyAppBar />
                <Grid item xs={12} sm={10} md={8} lg={7} sx={{ mx: 'auto', mt: 6 }}>

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

                                        label="Cover Image"
                                        type="file"
                                        inputRef={fileInput}
                                        id="file"
                                        sx={{ m: 2 }}
                                    />
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
                </Grid>
            </Grid>

        </>
    )
}

export default CreateBlog