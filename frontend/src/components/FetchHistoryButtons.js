import React from 'react';
import { useNavigate } from 'react-router-dom';

const FetchHistoryButtons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/fetch')}>Fetch</button>
      <button onClick={() => navigate('/history')}>History</button>
    </div>
  );
};

export default FetchHistoryButtons;
