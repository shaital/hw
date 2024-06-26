import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../ProfileContext';
import '../index.css';
const ProfileList = ({ source }) => {
  const { profiles, selectProfile, fetchProfilesFromAPI, fetchProfilesFromDB } = useContext(ProfileContext);
  const [filter, setFilter] = useState({ name: '', country: '' });

  useEffect(() => {
    if (source === 'api') {
      fetchProfilesFromAPI();
    } else if (source === 'db') {
      fetchProfilesFromDB();
    }
  }, [source, fetchProfilesFromAPI, fetchProfilesFromDB]);

  const filteredProfiles = profiles.filter(profile => {
    const firstName = profile.name?.first?.toLowerCase() || '';
    const country = profile.location?.country?.toLowerCase() || '';
    return firstName.includes(filter.name.toLowerCase()) && country.includes(filter.country.toLowerCase());
  });

  return (
    <div className="profile-list">
      <div>
        <input
          type="text"
          placeholder="Filter by name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by country"
          value={filter.country}
          onChange={(e) => setFilter({ ...filter, country: e.target.value })}
        />
      </div>
      {filteredProfiles.map(profile => (
        <Link 
          to={`/profile/${profile.login.uuid}`} 
          key={profile.login.uuid}
          onClick={() => selectProfile(profile)}
        >
          <div className="profile-item">
            <img className="profile-thumbnail" src={profile.picture.thumbnail} alt="Thumbnail" />
            <div className="profile-details">
              <p>{profile.name.title} {profile.name.first} {profile.name.last}</p>
              <p>{profile.gender}</p>
              <p>{profile.location.country}</p>
              <p>{profile.phone}</p>
              <p>{profile.email}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileList;
