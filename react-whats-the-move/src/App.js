import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.js'; // Adjust the path based on your project structure
import EventList from './components/EventsList.js';
import Login from './components/Login.js';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EventList />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;