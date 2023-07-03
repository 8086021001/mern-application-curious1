import { Avatar, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import './Comments.css';
import { Picker } from "emoji-mart";
import "../../../node_modules/emoji-mart/css/emoji-mart.css"
const CommentBox = () => {
    const [commentState, setCommentState] = useState('')
    const [showEmojis, setShowEmojis] = useState(false);
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setCommentState(commentState + emoji);
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={4}
            height="100vh"
            width="50vw"
            p={4}
        >
            <Typography variant="h4"> comments</Typography>
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
                        <Picker onSelect={addEmoji} />
                    </div>
                )}
                <TextField
                    multiline
                    value={commentState}
                    placeholder="Write comments"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setCommentState(e.target.value)}
                    sx={{ margin: 2, width: '75%' }}
                />
                <Button variant="contained" size="small" sx={{ margin: 2, width: '10%' }}>Post</Button>
            </Box>
        </Box>
    )
}

export default CommentBox


