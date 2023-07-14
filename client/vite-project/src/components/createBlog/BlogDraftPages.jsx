import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Box, width } from '@mui/system';





const BlogDraftPages = ({ blogDraft }) => {

    return (
        <div
            sx={{
                flexGrow: 1,
                padding: 2,

            }}
        >
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>

                <Box>
                    <Typography variant="h4" component="h1"
                        sx={{
                            textAlign: 'center',
                            marginBottom: 2,
                            marginTop: 8,
                        }}
                    >
                        My Drafted Blog
                    </Typography>
                </Box>
                <Box >

                    <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
                        <Grid item xs={8} sm={6} md={4} lg={5}  >
                            <Card
                                sx={{
                                    backgroundColor: '#f2f2f2',
                                    borderRadius: 1,
                                    padding: 0,
                                    width: 'auto',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="body" component="h3" sx={{ textAlign: 'center' }} >
                                        <a
                                            sx={{
                                                color: '#333',
                                                textDecoration: 'none',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            Drafted Blog {blogDraft?.title ?? "You have 1 blog to be completed"}

                                        </a>
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

            </Box>

            {/* Add section for published blogs using a similar grid structure */}
        </div >
    );
};

export default BlogDraftPages;
