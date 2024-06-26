import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileContext } from '../ProfileContext';
import axios from 'axios';
import '../index.css';

const ProfileDetails = () => {
  const { id } = useParams();
  const { selectedProfile, profiles, setProfiles, selectProfile,fetchProfileFromDB } = useContext(ProfileContext);
  const [editableName, setEditableName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProfile) {
      setEditableName(`${selectedProfile.name.title} ${selectedProfile.name.first} ${selectedProfile.name.last}`);
    }else{
      fetchProfileFromDB(id);
    }
  }, [selectedProfile,id,fetchProfileFromDB]);

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/profiles', selectedProfile);
      setProfiles([...profiles, response.data]);
      navigate('/history');
    } catch (error) {
      console.error('Error saving profile', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/profiles/${id}`);
      setProfiles(profiles.filter(profile => profile.login.uuid !== id));
      navigate('/history');
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedProfile = { 
        ...selectedProfile, 
        name: { 
          ...selectedProfile.name, 
          title: editableName.split(' ')[0], 
          first: editableName.split(' ')[1], 
          last: editableName.split(' ')[2] 
        }
      };
      const response = await axios.put(`http://localhost:5000/profiles/${id}`, updatedProfile);
      setProfiles(profiles.map(profile => profile.login.uuid === id ? response.data : profile));
      selectProfile(response.data);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  if (!selectedProfile) return <div>Loading...</div>;

  return (
    <div className="profile-details-container">
    <img src={selectedProfile.picture.large} alt="Profile" />
    <form className="profile-details-form">
      <p>Gender: {selectedProfile.gender}</p>
      <input
        type="text"
        value={editableName}
        onChange={(e) => setEditableName(e.target.value)}
      />
      <p>Age: {selectedProfile.dob.age}</p>
      <p>Year of Birth: {new Date(selectedProfile.dob.date).getFullYear()}</p>
      <p>Address: {selectedProfile.location.street.number} {selectedProfile.location.street.name}, {selectedProfile.location.city}, {selectedProfile.location.state}, {selectedProfile.location.country}</p>
      <p>Contact: {selectedProfile.email}, {selectedProfile.phone}</p>
      <div>
        <button onClick={handleSave}>Save</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </form>
  </div>
  );
};

export default ProfileDetails;
