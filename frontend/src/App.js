import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchHistoryButtons from './components/FetchHistoryButtons';
import ProfileList from './components/ProfileList';
import ProfileDetails from './components/ProfileDetails';
import { ProfileProvider } from './ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
    <Router>
      <Routes>
        <Route path="/" element={<FetchHistoryButtons />} />
        <Route path="/fetch" element={<ProfileList source="api" />} />
        <Route path="/history" element={<ProfileList source="db" />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
      </Routes>
    </Router>
  </ProfileProvider>
  );
};

export default App;
