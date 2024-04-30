import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LocalActivity from '@mui/icons-material/LocalActivity';
import { Link } from 'react-router-dom';
import styles from './Toolbar.module.css';
import Cookies from 'js-cookie';

function TopToolbar({ onFeedClick, onHomeClick }) {
    const userId = Cookies.get('userId');
    return (
        <AppBar position="static" sx={{ backgroundColor: '#483C32' }}>
            <Toolbar>
                <IconButton color="inherit" component={Link} to="/" sx={{ marginRight: 0 }}>
                    <LocalActivity /> 
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: 'Limelight, sans-serif', marginLeft: 0}}>
                    what's the move
                </Typography>
                { 
                userId ? 
                <Link className={styles.toolbarTink} to="/profile">Your Profile</Link> 
                : 
                <Link className={styles.toolbarTink} to='/login'>Sign In/Register</Link> 
                }
               
                
            </Toolbar>
        </AppBar>
    );
}

export default TopToolbar;

