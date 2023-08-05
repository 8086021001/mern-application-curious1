import React, { useState, useEffect } from 'react';
import { TextField, Button, Chip, Typography, Container, ThemeProvider } from '@mui/material';
import axiosInstance from '../../baseAPI/axiosBaseURL';
import { Buttontheme } from '../Theme/ButtonTheme';


const InterestsField = ({ handleInterestSubmit }) => {
    const [interests, setInterests] = useState([]);
    const [selectedInterest, setSelectedInterest] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchInterests = async () => {
        try {
            const response = await axiosInstance.get('/user/interests');
            const datas = response.data;
            setInterests(datas?.fileds);
        } catch (error) {
            console.error('Error fetching interests:', error);
        }
    };



    const handleInterestSelect = (interest) => {
        setSelectedInterest((prevInterest) => {
            if (prevInterest.some((item) => item._id === interest._id)) {
                return prevInterest.filter((item) => item._id !== interest._id);
            } else {
                return [...prevInterest, interest];
            }
        });
    };


    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredInterests = interests.filter((interest) =>
        interest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        handleInterestSubmit(selectedInterest)
    };

    useEffect(() => {
        fetchInterests();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ textAlign: 'center' }}>
                Choose your interest and we give best connections and content to you
            </Typography>
            <Typography variant='subtitle2' component='subtitle1' sx={{ textAlign: 'center' }} >
                Make atleast one selection
            </Typography>
            <ThemeProvider theme={Buttontheme}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Search interests"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder="Search interests"
                        fullWidth
                        margin="normal"
                    />

                    <div>
                        {filteredInterests.map((interest) => (
                            <Chip
                                key={interest._id}
                                label={interest.name}
                                onClick={() => handleInterestSelect(interest)}
                                color={selectedInterest.some((item) => item._id === interest._id) ? 'primary' : 'secondary'}
                                sx={{
                                    marginTop: '5rem',
                                    marginRight: '0.5rem',
                                    marginBottom: '8rem',
                                    backgroundColor: (theme) =>
                                        selectedInterest.some((item) => item._id === interest._id)
                                            ? theme.palette.primary.main
                                            : theme.palette.secondary.main,
                                    color: (theme) =>
                                        selectedInterest.some((item) => item._id === interest._id)
                                            ? theme.palette.primary.contrastText
                                            : theme.palette.secondary.contrastText,
                                }}
                            />

                        ))}
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>

                </form>
            </ThemeProvider>
            <Typography variant='subtitle2' component='h6' sx={{ textAlign: 'center', margin: "3rem" }} >
                Make atleast one selection
            </Typography>
        </Container>
    );
};

export default InterestsField;
