import { CircularProgress, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import React from 'react'

const CommentsDisplayBox = ({ comments }) => {


    return (
        <>
            <Container maxWidth="md">


                <Box>
                    <Paper elevation={3} sx={{ padding: '1rem' }}>
                        <List>
                            {comments.map((comment, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={comment.user} secondary={comment.comment} />

                                    <IconButton>
                                        <EditIcon />
                                        <Typography variant="caption">Edit</Typography>
                                    </IconButton>

                                    <IconButton>
                                        <DeleteIcon />
                                        <Typography variant="caption">Delete</Typography>
                                    </IconButton>
                                </ListItem>
                            ))}
                            {/* {loading && <CircularProgress />} */}
                            {/* {!loading && !hasMore && <p>No more comments</p>} */}
                        </List>

                    </Paper>
                </Box>
            </Container>
        </>
    )
}

export default CommentsDisplayBox