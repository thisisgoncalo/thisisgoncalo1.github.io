// src/components/RedirectComponent.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/joingoncaloclub');
  }, [navigate]);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default RedirectComponent;
