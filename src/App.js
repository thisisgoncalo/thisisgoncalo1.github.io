// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import JoinForm from './components/JoinForm';
import ThankYouPage from './components/ThankYouPage';
import RedirectComponent from './components/RedirectComponent'; // Import the new component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join-form" element={<JoinForm />} />
        <Route path="/joingoncaloclub" element={<JoinForm />} />
        <Route path="/redirect-joingoncaloclub" element={<RedirectComponent />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
