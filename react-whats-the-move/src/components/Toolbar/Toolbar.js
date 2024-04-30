import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import LocalActivity from '@mui/icons-material/LocalActivity';
import Feed from '../Feed/Feed';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import styles from './Toolbar.module.css';

function TopToolbar({ onFeedClick, onHomeClick }) {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#483C32' }}>
            <Toolbar>
                <IconButton color="inherit" onClick={onHomeClick} sx={{ marginRight: 0 }}>
                    <LocalActivity /> 
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: 'Limelight, sans-serif', marginLeft: 0}}>
                    what's the move
                </Typography>
                {/* <SearchBar /> */}
                <Link className={styles.toolbarTink} to="/profile">Your Feed</Link>
                <Link className={styles.toolbarTink} to='/login'>Sign In/Register</Link>
            </Toolbar>
        </AppBar>
    );
}

export default TopToolbar;

