import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material';





const BlogDraftPages = () => {

    return (
        <div
            sx={{
                flexGrow: 1,
                padding: 2,
            }}
        >
            <Typography variant="h4" component="h1"
                sx={{
                    textAlign: 'center',
                    marginBottom: 2,
                    marginTop: 8
                }}
            >
                My Blog
            </Typography>

            <Typography variant="h5" component="h2"
                sx={{
                    textAlign: 'center',
                    marginBottom: 2,
                }}
            >
                Drafted Blogs
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Card
                        sx={{
                            backgroundColor: '#f2f2f2',
                            borderRadius: 1,
                            padding: 2,
                            width: '100%',
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
                            <Typography variant="h6" component="h3">
                                <a
                                    href="drafted-blog-1.html"
                                    sx={{
                                        color: '#333',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Drafted Blog 1
                                </a>
                            </Typography>
                            <Typography variant="body2" component="p">
                                Description of drafted blog 1.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            {/* Add section for published blogs using a similar grid structure */}
        </div>
    );
};

export default BlogDraftPages;
