import { Avatar, CircularProgress, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { Box, Container, Stack, flexbox, grid } from '@mui/system'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const CommentsDisplayBox = ({ comments }) => {
    const userData = useSelector(state => state.authUser)

    // if (userData.authState._id ===)

    return (
        <>
            <Grid container spacing={2} sx={{ marginRight: '2rem' }} >
                <Grid item xs={12} md={10} lg={10} >


                    <Box>
                        <Paper elevation={3} sx={{ padding: '1rem' }}>
                            <List >
                                {comments.map((comment, index) => (
                                    <ListItem key={index} sx={{ backgroundColor: '#f5f5f5', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                                        <Box display={grid}>
                                            <Box display="flex" alignItems="center" flexDirection="row" flexWrap="wrap">
                                                <Avatar alt={comment.username} src={comment.userProfile} sx={{ margin: '1rem' }} />
                                                <ListItemText primary={comment.username} />
                                                {userData.authState._id === comment.authorId ? (
                                                    <Box ml="auto" display={'flex'} justifyContent={'left'}>
                                                        {console.log("i am printing authrentication of user", userData.authState._id, "  and ", comment.authorId)}
                                                        <IconButton onClick={() => handleEditComment(comment.commentId)}>
                                                            <EditIcon />
                                                            <Typography variant="caption">Edit</Typography>
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDeleteComment(comment.commentId)}>
                                                            <DeleteIcon />
                                                            <Typography variant="caption">Delete</Typography>
                                                        </IconButton>

                                                    </Box>
                                                ) : null
                                                }
                                            </Box>
                                            <Box pl={7} mt={1} >
                                                <ListItemText primary={comment.comment} />
                                            </Box>
                                        </Box>
                                    </ListItem>
                                ))}
                                {/* {loading && <CircularProgress />} */}
                                {/* {!loading && !hasMore && <p>No more comments</p>} */}
                            </List>

                        </Paper>
                    </Box>
                </Grid>
            </Grid >
        </>
    )
}

export default CommentsDisplayBox