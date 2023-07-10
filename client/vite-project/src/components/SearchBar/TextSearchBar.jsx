import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { Box, grid } from '@mui/system';
import { debounce } from 'lodash';
import { resetSearch } from '../../features/user/blogCreateSlice';
import { useDispatch } from 'react-redux';


const TextSearchBar = ({ handleSearchQuery }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch()

    const debouncedSearch = debounce((value) => {

        handleSearchQuery(value)
    }, 300);

    const handleSearch = (event) => {
        const searchText = event.target.value;
        if (searchText === "") {
            console.log("if empty")
            dispatch(resetSearch())
        }
        if (searchText !== "") {
            console.log("if not empty")

            setSearchTerm(searchText)
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            debouncedSearch(searchTerm);
        }
    }


    return (
        <>
            <Grid display={grid} xs={8} sm={7} md={6} lg={6} flexGrow={1} sx={{ margin: 2 }}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>


                    <TextField
                        id="search-bar"
                        variant="outlined"
                        placeholder="Search..."
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        sx={{ width: '40%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton disabled>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disabled>
                                        {/* <MicIcon /> */}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Grid>
        </>
    )
}

export default TextSearchBar