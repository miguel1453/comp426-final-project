import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import styles from './SearchBar.module.css';

const locations = ['New York', 'Los Angeles', 'Chicago']; // Example locations
const categories = ['Music', 'Sports', 'Arts & Theatre']; // Example categories

function SearchBar() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 2 }}>
            <Autocomplete
                freeSolo
                options={locations}
                renderInput={(params) => <TextField {...params} className={styles.searchBarInput} label="Search Locations" />}
                sx={{ width: 300, marginRight: 1 }}
            />
            <Autocomplete
                options={categories}
                renderInput={(params) => <TextField {...params} className={styles.searchBarInput} label="Event Categories" />}
                sx={{ width: 300 }}
            />
        </Box>
    );
}

export default SearchBar;

