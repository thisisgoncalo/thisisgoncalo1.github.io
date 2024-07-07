// src/components/ThankYouPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <div className="thank-you-page">
      <h1>Thank You!</h1>
      <p>Your subscription has been received. We’ll keep you updated with the latest news and releases.</p>
      <button className="btn close-btn" onClick={handleClose}>CLOSE</button>
    </div>
  );
};

export default ThankYouPage;
