import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, IconButton, Box, TextField, Stack } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './PostCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog, resetSateAfterFetch } from '../../features/user/blogCreateSlice';
import { useNavigate } from 'react-router-dom';

const PostCard = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [showCommentField, setShowCommentField] = useState(false);

    const dispatch = useDispatch()
    const BlogState = useSelector(state => state.blogCreateState)
    const navigate = useNavigate()
    const handleViewBlog = (_id) => {
        navigate(`/user/viewBlog/${_id}`)
    }

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleComment = () => {
        setShowCommentField(true);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() !== '') {
            const newComment = {
                id: new Date().getTime().toString(),
                text: commentText.trim(),
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    const handleCommentCancel = () => {
        setShowCommentField(false);
        setCommentText('');
    };
    useEffect(() => {
        const fetchData = () => {
            dispatch(getAllBlog());
        };

        fetchData();

    }, [])




    return (
        <Grid container justifyContent="center" sx={{ marginLeft: '16px', marginTop: '40px' }}>

            <Grid item xs={12} md={8} lg={6}>
                {(Array.isArray(BlogState.blogData) && BlogState.blogData !== 0) && BlogState.blogData.map((blog) => {
                    return (
                        <div key={blog._id._id}>
                            <Card className="post-card" sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1, 0.3)' }}>
                                <CardMedia component="img" image={blog._id.coverImage} title={blog._id.title} className="post-card-media" onClick={() => handleViewBlog(blog._id._id)} sx={{ width: '30%', minWidth: '200px', marginRight: '16px', borderRadius: '8px 0 0 8px', objectFit: 'cover', padding: 2 }} />
                                <CardContent className="post-card-content" sx={{ flex: 1 }}>
                                    <Typography variant="h6" onClick={() => handleViewBlog(blog._id._id)} component="h2" className="post-card-title" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                        {blog._id.title}
                                    </Typography>
                                    <Typography variant="body2" onClick={() => handleViewBlog(blog._id._id)} color="textSecondary" className="post-card-summary" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        {blog._id.summary}
                                    </Typography>


                                    <Stack direction='row'>
                                        <Stack direction='row'>
                                            <IconButton color="primary" className='FavIcon' aria-label="like" onClick={handleLike} sx={{ marginRight: '8px' }}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <div className='LikeIcon' sx={{ marginLeft: '2px', background: 'red', padding: '4px 8px' }}>
                                                {likes} Likes
                                            </div>
                                        </Stack>
                                        <Stack direction='row'>
                                            <IconButton color="primary" className='commentIc' aria-label="comment" onClick={handleComment} sx={{ marginLeft: '8px', marginRight: '8px' }}>
                                                <CommentIcon />
                                            </IconButton>

                                            <div className='commentxt' sx={{ marginLeft: '8px' }}>
                                                {comments.length} Comments
                                            </div>
                                        </Stack>

                                    </Stack>

                                    {showCommentField && (
                                        <div className="comment-field" sx={{ marginTop: '16px' }}>
                                            <TextField
                                                label="Write a comment"
                                                variant="outlined"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                multiline
                                                fullWidth
                                                rows={3}
                                                sx={{ marginBottom: '8px' }}
                                            />
                                            <div className="comment-actions">
                                                <IconButton color="primary" className='cancelComment' aria-label="cancel" onClick={handleCommentCancel}>
                                                    Cancel
                                                </IconButton>
                                                <IconButton color="primary" className='cancelComment' aria-label="submit" onClick={handleCommentSubmit}>
                                                    Submit
                                                </IconButton>
                                            </div>
                                        </div>
                                    )}
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="comment">
                                            <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
                                                {comment.text}
                                            </Typography>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    )

                })}
            </Grid>

        </Grid>
    );
};

export default PostCard;
