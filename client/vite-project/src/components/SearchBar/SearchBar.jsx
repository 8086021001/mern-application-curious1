import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, Box, Button } from '@mui/material';

const SearchBar = ({ tags, handleTagValues }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);



    const handleOptionChange = (event, values) => {
        setSelectedOptions(values);
    };
    useEffect(() => {
        handleTagValues(selectedOptions)
    }, [selectedOptions])


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Autocomplete
                multiple
                value={selectedOptions}
                onChange={handleOptionChange}
                options={tags}
                renderInput={(params) => (
                    <TextField {...params} label="tags" variant="outlined" fullWidth />
                )}
                sx={{ mb: 2, width: '100%', maxWidth: 400 }}
            />

        </Box>
    );
};

export default SearchBar;
