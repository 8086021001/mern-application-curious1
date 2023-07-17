import { Button, Divider, FormControl, Grid, IconButton, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import EditBlogsEditotNewTheme from '../ReactQuill/EditBlogsEditotNewTheme'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagePreview from '../ImagePreview/ImagePreview'
import { editMyBlog } from '../../features/user/blogCreateSlice'
import { useNavigate } from 'react-router-dom'


const EditMyBlog = ({ blog }) => {
  const fileInput = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogState = useSelector(state => state.blogCreateState)
  const [blogTitle, setTitle] = useState('')
  const [blogSummary, setSummary] = useState('')
  const [blogContent, setContent] = useState(null)
  const [blogId, setBlogId] = useState(null)
  const [blogCoverImg, setBlogcoverImg] = useState(null)
  const editContent = (content) => {
    setContent(content)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const errors = {};

    if (!blogTitle) {
      isValid = false;
      errors.title = 'Title is required';
    }

    if (!blogSummary) {
      isValid = false;
      errors.summary = 'Summary is required';
    }
    // if (!BlogState.tags || BlogState.tags.length === 0) {
    //   isValid = false;
    //   errors.tags = 'please tag a related field!'
    // }
    if (!blogId) {
      isValid = false;
      errors.tags = 'No such blog!'
    }


    if (!blogContent) {
      isValid = false;
      errors.content = 'Content is required';
    }

    // if (fileInput.current.files.length === 0) {
    //   isValid = false;
    //   errors.file = 'File is required';
    // }

    if (!isValid) {
      console.log('Validation errors:', errors);
      Object.values(errors).forEach((errorMsg) => {
        toast.warning(errorMsg);
      });

      return;
    }

    const EditblogData = new FormData();
    EditblogData.append('title', blogTitle);
    EditblogData.append('summary', blogSummary);
    EditblogData.append('content', blogContent);
    EditblogData.append('blogId', blogId)

    const file = fileInput.current.files[0];
    if (file) {
      EditblogData.append('coverImage', file, file?.name);
    }

    for (let [key, value] of EditblogData.entries()) {
      console.log(key, value);
    }
    dispatch(editMyBlog(EditblogData))
  }
  useEffect(() => {
    if (blog) {
      setTitle(blog?.title)
      setSummary(blog?.summary)
      setBlogId(blog?._id)
      setBlogcoverImg(blog?.coverImage)
    }
    if (blogState.editSucess) {
      const blog = blogState?.blog
      console.log("my resultant blog", blog)
      navigate('/user/myBlogs', { state: { blog } })
    }
  }, [blog, blogState.editSucess])



  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={7} lg={8} sx={{ mx: 'auto', mt: 6 }}>
          <Box >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box>
                <Typography variant='h4'>
                  Edit your blog
                </Typography>
                <Divider sx={{ padding: 2, marginBottom: 2 }} />
              </Box>

            </Box>
            <Paper>
              <form onSubmit={handleSubmit}>
                <Box sx={{ m: 5 }}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      value={blogTitle}
                      InputProps={{
                        style: {
                          fontSize: '2rem',
                          fontWeight: 'bold',
                        }
                      }}
                      label="Title"
                      id="title"
                      multiline
                      onChange={(e) => setTitle(e.target.value)}
                      sx={{ m: 2 }} />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      value={blogSummary}
                      label="Summary"
                      id="Summary"
                      multiline
                      onChange={(e) => setSummary(e.target.value)}
                      sx={{ m: 2 }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      // value={}
                      type="file"
                      inputRef={fileInput}
                      id="file"
                      sx={{ m: 2, maxWidth: 250 }}
                    />
                    <InputLabel htmlFor="file" shrink>
                      Cover Image
                    </InputLabel>
                    <Box sx={{ marginLeft: '1rem' }}>
                      <ImagePreview image={blogCoverImg} />
                    </Box>
                    {/* <SearchBar tags={tags} handleTagValues={HandleTags} ></SearchBar> */}

                  </FormControl>
                  <FormControl fullWidth sx={{ m: 2 }}>
                    <EditBlogsEditotNewTheme blogContent={blog?.content} handleContent={editContent} />

                  </FormControl>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
                      Submit
                    </Button>
                  </Box>
                </Box>
              </form>
            </Paper>

          </Box>

        </Grid>

      </Grid>


    </>
  )
}

export default EditMyBlog