import { Avatar, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './Comments.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetBlogComment, MakeBlogComment } from '../../features/user/blogCreateSlice';
import CommentsDisplayBox from './CommentsDisplayBox';
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'
const CommentBox = ({ blog }) => {
    const [commentState, setCommentState] = useState('')
    const [showEmojis, setShowEmojis] = useState(false);
    const dispatch = useDispatch()
    const blogCommentState = useSelector(state => state.blogCreateState)


    const handleCommentPost = () => {
        if (commentState.trim() !== '') {
            console.log(commentState)
            const content = {
                blogId: blog?._id,
                comment: commentState
            }
            dispatch(MakeBlogComment(content))
            setCommentState('')
        }
    }


    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setCommentState(commentState + emoji);
    };

    useEffect(() => {
        if (blog?._id) {
            dispatch(GetBlogComment(blog?._id))

        }
    }, [blogCommentState.comments.length, blog._id])
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={4}
                // height="100vh"
                width="50vw"
                p={4}
            >
                <Typography variant="h4"> Comments</Typography>
                <Box display="flex" flexDirection="row">
                    <Avatar alt="Remy Sharp" src="/" sx={{ margin: 2 }} />
                    <button className='iconButton'
                        onClick={() => setShowEmojis(!showEmojis)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                    {showEmojis && (
                        <div>
                            {/* <Picker onSelect={addEmoji} /> */}
                        </div>
                    )}
                    <TextField
                        multiline
                        rows={2}
                        value={commentState}
                        placeholder="Write comments"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setCommentState(e.target.value)}
                        sx={{ margin: 1, width: '75%' }}
                    />
                    <Button variant="contained" size="small" sx={{ margin: 2, width: '10%' }} onClick={handleCommentPost}>Post</Button>
                    {
                        blog.comments && blog.comments.map((comment, i) => {
                            <Typography key={i} gutterBottom variant='subtitle1'>
                                Comment {i}
                            </Typography>
                        })

                    }
                </Box>
            </Box>{blogCommentState?.comments.length > 0 &&
                <CommentsDisplayBox comments={blogCommentState?.comments} />
            }
        </>
    )
}

export default CommentBox


