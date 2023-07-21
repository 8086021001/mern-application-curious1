import { Autocomplete, Box, Card, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/system';
import { set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { searchAllUsers } from '../../features/user/userConnectionSlice';
import { debounce } from 'lodash';


const UserSearch = ({ handleAvailableUsers }) => {
    const [usersAvail, setUserAvailable] = useState('')
    const dispatch = useDispatch()
    const searchState = useSelector(state => state.connection)
    // console.log("search state for user",)

    const handleUserSearch = (e) => {
        const Uservalue = e.target.value
        if (Uservalue !== "") {
            setUserAvailable(Uservalue)

        } else if (Uservalue === "") {
            setUserAvailable('')
        }
    }
    const handleDebounceSearch = debounce((usersAvail) => {
        // if (searchState.searchUsers.length === 0) {
        //     handleAvailableUsers(undefined)
        // }
        // const searchResult = searchState?.searchUsers?.following.filter((user) =>
        //     user.name.toLowerCase().includes(usersAvail.toLowerCase()))
        // console.log("my search results", searchResult)
        handleAvailableUsers(usersAvail)

    }, 200)
    useEffect(() => {
        handleDebounceSearch(usersAvail);

    }, [usersAvail])

    useEffect(() => {
        if (!searchState.searchSuccess) {
            dispatch(searchAllUsers())
        }

    }, [searchState.searchSuccess])



    return (
        <>
            <Box sx={{ margin: 3 }}>

                <TextField fullWidth label="Search users"
                    value={usersAvail}
                    onChange={handleUserSearch}
                    id="fullWidth"
                    InputProps={{
                        endAdornment: (
                            <SearchIcon style={{ cursor: 'pointer' }} />
                        )
                    }}
                />
            </Box>

        </>

    )

}

export default UserSearch