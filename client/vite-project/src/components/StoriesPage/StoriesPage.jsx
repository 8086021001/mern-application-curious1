import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { Container } from '@mui/system';
import BlogCards from '../PostCard/BlogCards';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedBlogs, getUserBlogs } from '../../features/user/blogCreateSlice';

const StoriesPage = () => {
    const [activeTab, setActiveTab] = useState('drafts');
    const blogState = useSelector(state => state.blogCreateState)
    const useAuthState = useSelector(state => state.authUser)
    const dispatch = useDispatch()


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (activeTab === 'drafts') {

        } else if (activeTab === 'published') {
            dispatch(getUserBlogs())
        } else if (activeTab === 'saved') {
            if (useAuthState?.authState?.savedBlogs.length > 0) {
                dispatch(getSavedBlogs())
            }

        }
    };
    console.log("traking blogstate", useAuthState)

    useEffect(() => {

    }, [blogState.success, blogState.useBlogs, blogState.savedBlogs])


    return (
        <>
            <Grid>
                <Box display="flex" justifyContent="center">


                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={{ xs: 2, sm: 4, md: 6 }}
                        m={{ xs: 2, sm: 4, md: 6 }}
                        border={1}
                        sx={{
                            width: '100%',
                            maxWidth: 800,
                            margin: '0 auto',
                        }}
                    >
                        <Typography variant='h4'>Your Stories</Typography>
                    </Box>

                </Box>
                <Box display="flex" justifyContent="center">


                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"

                        sx={{
                            width: '100%',
                            maxWidth: 800,
                            margin: '0',
                        }}
                    >


                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '2px solid #000',
                                cursor: 'pointer',
                                width: '80%',
                            }}
                        >

                            <Typography
                                variant="h6"
                                onClick={() => handleTabClick('drafts')}
                                style={{
                                    padding: '10px 15px',
                                    borderBottom: `2px solid ${activeTab === 'drafts' ? '#000' : 'transparent'}`,
                                    transition: 'border-bottom-color 0.3s ease',
                                    fontWeight: activeTab === 'drafts' ? 'bold' : 'normal',
                                }}
                            >
                                Drafts
                            </Typography>
                            <Typography
                                variant="h6"
                                onClick={() => handleTabClick('published')}
                                style={{
                                    padding: '10px 15px',
                                    borderBottom: `2px solid ${activeTab === 'published' ? '#000' : 'transparent'}`,
                                    transition: 'border-bottom-color 0.3s ease',
                                    fontWeight: activeTab === 'published' ? 'bold' : 'normal',
                                }}
                            >
                                Published
                            </Typography>
                            <Typography
                                variant="h6"
                                onClick={() => handleTabClick('saved')}
                                style={{
                                    padding: '10px 15px',
                                    borderBottom: `2px solid ${activeTab === 'saved' ? '#000' : 'transparent'}`,
                                    transition: 'border-bottom-color 0.3s ease',
                                    fontWeight: activeTab === 'saved' ? 'bold' : 'normal',
                                }}
                            >
                                Saved
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Container>
                    <Box>
                        <Box>
                            {blogState?.useBlogs && blogState?.useBlogs.length > 0 && activeTab === "published" ? <BlogCards Blogs={blogState?.useBlogs} /> : <div>No posts yet</div>}
                        </Box>
                        <Box>
                            {activeTab === "saved" && blogState?.savedBlogs && blogState?.savedBlogs.length > 0 ? <BlogCards Blogs={blogState?.savedBlogs} /> : <div>No saved posts yet</div>}
                        </Box>

                    </Box>

                </Container>

            </Grid>
        </>

    );
};



export default StoriesPage;
