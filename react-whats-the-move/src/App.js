
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Signup from './components/Signup.js'; 
import Login from './components/Login.js';
import Profile from './components/Profile/Profile.js';


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;