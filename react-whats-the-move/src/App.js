import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.js'; // Adjust the path based on your project structure

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
