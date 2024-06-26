import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchProfilesFromAPI = useCallback(async () => {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    setProfiles(response.data.results);
  }, []);

  const fetchProfilesFromDB = useCallback(async () => {
    const response = await axios.get('http://localhost:5000/profiles');
    setProfiles(response.data);
  }, []);

  const fetchProfileFromDB = useCallback(async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/profiles/${uuid}`);
      setSelectedProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  }, []);

  const selectProfile = useCallback((profile) => {
    setSelectedProfile(profile);
  }, []);

  return (
    <ProfileContext.Provider value={{ profiles, selectedProfile, selectProfile, fetchProfilesFromAPI, fetchProfilesFromDB,fetchProfileFromDB }}>
      {children}
    </ProfileContext.Provider>
  );
};
