import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './pages/Upload';
import Details from './pages/details'; // Import the Upload component
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/details" element={<Details />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;