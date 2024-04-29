import './App.css';
import React, { useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import TopToolbar from './components/Toolbar/Toolbar';
import Feed from './components/Feed/Feed';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'feed'

  return (
    <div className="App">
      <BrowserRouter>
      {currentPage === 'feed' ? <Feed /> : <HomePage setCurrentPage={setCurrentPage} />}
      </BrowserRouter>
    </div>
  );
}


export default App;
