// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import JoinForm from './components/JoinForm';
import ThankYouPage from './components/ThankYouPage';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}> {/* Added basename prop */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join-form" element={<JoinForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
