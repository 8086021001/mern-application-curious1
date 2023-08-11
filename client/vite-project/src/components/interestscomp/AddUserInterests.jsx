import { Autocomplete, Stack, TextField } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInterest } from '../../features/user/interestSlice'

const Adduserinterests = ({ handleInterestchange }) => {

    const [interestFields, setInterestFields] = useState([])
    const dispatch = useDispatch()
    const interestsState = useSelector(state => state?.interests)



    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event, value) => {
        setSelectedOptions(value);
        if (value.length > 0) {
            handleInterestchange(value)
        }
    };
    useEffect(() => {
        // console.log("in auto complete", interestsState?.interests)
        dispatch(getUserInterest())
    }, [interestsState?.success])

    return (
        <>
            <Stack spacing={3} sx={{ width: '100%' }}>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={interestsState?.interests}
                    getOptionLabel={(option) => option?.name}
                    value={selectedOptions}
                    onChange={handleChange}
                    defaultValue={[interestsState[1]]}
                    filterSelectedOptions
                    renderInput={(params) => (

                        <TextField
                            {...params}
                            label="interests"
                            placeholder='Favorites'
                        />
                    )}
                >
                </Autocomplete>
            </Stack>
        </>
    )
}

export default Adduserinterests