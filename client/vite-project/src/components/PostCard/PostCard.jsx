import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, IconButton, Box, TextField, Stack, Avatar } from '@mui/material';
import './PostCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { MakeLikeSuccess, getAllBlog, getSearchContent, resetLikeState, resetSateAfterFetch } from '../../features/user/blogCreateSlice';
import { useNavigate } from 'react-router-dom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { logginUserReset, setBlogAsDraft } from '../../features/user/userSlice';
import { setAuth } from '../../features/auth/userAuth';
import SnackBar from '../SnackBar/SnackBar';
import TextSearchBar from '../SearchBar/TextSearchBar';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import { grid } from '@mui/system';

const PostCard = () => {


    const dispatch = useDispatch()
    const BlogState = useSelector(state => state.blogCreateState)
    const userAuthstate = useSelector(state => state.authUser)
    const userState = useSelector(state => state.user)
    const navigate = useNavigate()
    const handleViewBlog = (_id) => {
        navigate(`/user/viewBlog/${_id}`)
    }


    let success
    const savedDrafts = userAuthstate?.authState?.savedBlogs

    const handleBookmarkSave = (BlogId) => {
        const data = {
            blogId: BlogId
        }
        dispatch(setBlogAsDraft(data))
    }

    const handleSearchReq = (value) => {

        dispatch(getSearchContent(value))
    }
    const handleLikeButton = (userId, blogId) => {
        const data = {
            userId: userId,
            blogId: blogId
        }
        dispatch(MakeLikeSuccess(data))
    }



    useEffect(() => {
        dispatch(resetSateAfterFetch())
        dispatch(resetLikeState())
        const fetchData = () => {
            dispatch(getAllBlog());
        };

        fetchData();

        if (userState.success) {
            localStorage.setItem('user', JSON.stringify(userState.user))
            dispatch(setAuth())
            dispatch(logginUserReset())
        }

    }, [userState.success, BlogState.searchSuccess, BlogState.likeSuccess])




    return (
        <>
            <TextSearchBar handleSearchQuery={handleSearchReq} />
            <Grid container justifyContent="center" sx={{ marginLeft: '16px', marginTop: '40px' }}>
                <Grid item xs={12} md={8} lg={6}>
                    {userState.message && <SnackBar message={userState?.message} severity={success} />}
                    {(Array.isArray(BlogState.blogData) && BlogState.blogData !== 0 && BlogState?.searchBlogs?.length === 0) && BlogState.blogData.map((blog) => {
                        return (
                            <div key={blog?._id}>
                                <Card className="post-card" sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1, 0.3)' }}>
                                    <CardMedia component="img" image={blog?.coverImage} title={blog?.title} className="post-card-media" onClick={() => handleViewBlog(blog?._id)} sx={{ width: '30%', minWidth: '200px', marginRight: '16px', borderRadius: '8px 0 0 8px', objectFit: 'cover', padding: 2 }} />
                                    <CardContent className="post-card-content" sx={{ flex: 1 }}>
                                        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', top: 0, right: 0 }}>
                                            <IconButton disableRipple onClick={() => handleBookmarkSave(blog?._id)} sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', top: 0, right: 0, '&:hover': { backgroundColor: 'transparent' } }}>
                                                {savedDrafts?.length > 0 && savedDrafts.includes(blog?._id) ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Typography onClick={() => handleViewBlog(blog?._id)} variant="h6" component="h2" className="post-card-title" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                                {blog?.title}
                                            </Typography>
                                            <Grid display={'flex'} margin={2} spacing={5} justifyContent={'left'} alignItems={'center'} >
                                                <Avatar alt="Remy Sharp" src={blog?.author?.image} />
                                                <Typography marginLeft={2} borderBottom={1}>{blog?.author?.name}</Typography>
                                            </Grid>
                                            <Typography >created at: {new Date(blog?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</Typography>
                                            <Grid borderBottom={1} display={'flex'}>Tags :
                                                {blog?.interestNames.map((intName) => (
                                                    <Typography >{intName},</Typography>
                                                ))}
                                            </Grid>

                                            <Typography onClick={() => handleViewBlog(blog?._id)} marginTop={2} variant="body2" color="textSecondary" className="post-card-summary" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                                {blog?.summary}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', width: '30%', margin: '0.5rem ' }} >

                                                <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }} onClick={() => handleLikeButton(userAuthstate?.authState?._id, blog?._id)}>
                                                    {blog?.likes?.some(like => like.user === userAuthstate.authState._id) ? <ThumbUpOffAltRoundedIcon sx={{ margin: '2px' }} /> : <ThumbUpOffAltOutlinedIcon sx={{ margin: '2px' }} />}
                                                    <Typography sx={{ margin: '2px' }} >{blog?.likes?.length} Likes</Typography>
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </div>
                        )

                    })}
                    {BlogState?.searchBlogs?.length > 0 && BlogState.searchBlogs.map((blog) => {
                        return (
                            <div key={blog._id}>
                                <Card className="post-card" sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1, 0.3)' }}>
                                    <CardMedia component="img" image={blog.coverImage} title={blog.title} className="post-card-media" onClick={() => handleViewBlog(blog._id)} sx={{ width: '30%', minWidth: '200px', marginRight: '16px', borderRadius: '8px 0 0 8px', objectFit: 'cover', padding: 2 }} />
                                    <CardContent className="post-card-content" sx={{ flex: 1 }}>
                                        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', top: 0, right: 0 }}>
                                            <IconButton disableRipple onClick={() => handleBookmarkSave(blog._id)} sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', top: 0, right: 0, '&:hover': { backgroundColor: 'transparent' } }}>
                                                {savedDrafts.length > 0 && savedDrafts.includes(blog?._id) ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" onClick={() => handleViewBlog(blog._id)} component="h2" className="post-card-title" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                                {blog.title}
                                            </Typography>
                                            <Typography variant="body2" onClick={() => handleViewBlog(blog._id)} color="textSecondary" className="post-card-summary" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                                {blog.summary}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'left', width: '30%', margin: '2rem ' }} >

                                            <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                                                {blog?.likes?.some(like => like.user === userAuthstate.authState._id) ? <ThumbUpOffAltRoundedIcon onClick={() => handleLikeButton(userAuthstate?.authState?._id, blog?._id?._id)} sx={{ margin: '1 rem' }} /> : <ThumbUpOffAltOutlinedIcon onClick={() => handleLikeButton(userAuthstate?.authState?._id, blog?._id?._id)} sx={{ margin: '1rem' }} />}
                                                <Typography>{blog.likes?.length} Likes</Typography>
                                            </IconButton>
                                        </Box>

                                    </CardContent>
                                </Card>
                            </div>
                        )

                    })}
                </Grid>

            </Grid>

        </>
    );
};

export default PostCard;
