
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.js'; // Adjust the path based on your project structure
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;