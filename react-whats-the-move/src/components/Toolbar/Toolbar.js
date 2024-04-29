import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import LocalActivity from '@mui/icons-material/LocalActivity';
import Feed from '../Feed/Feed';

function TopToolbar({ onFeedClick, onHomeClick }) {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#483C32' }}>
            <Toolbar>
                <IconButton color="inherit" onClick={onHomeClick} sx={{ marginRight: -5 }}>
                    <LocalActivity /> 
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: 'Limelight, sans-serif', marginLeft: -3}}>
                    what's the move
                </Typography>
                <SearchBar />
                <Button color="inherit" onClick={onFeedClick}>Your Feed</Button>
                <Button color="inherit">Sign In/Register</Button>
            </Toolbar>
        </AppBar>
    );
}

export default TopToolbar;

