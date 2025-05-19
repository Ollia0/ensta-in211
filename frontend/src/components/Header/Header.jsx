import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import logo from '../../assets/images/logo.png';
import profile_placeholder from '../../assets/images/profilepicture_placeholder.png';

const back_url = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profilePicture, setProfilePicture] = useState(profile_placeholder);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${back_url}/auth/checkauth`, {
          withCredentials: true,
        });

        if (response.data.authenticated) {
          // Récupérer les données complètes du profil
          const userResponse = await axios.get(
            `${back_url}/users/profile/${response.data.user.username}`,
          );

          // Si l'utilisateur a une photo de profil, l'utiliser
          if (userResponse.data.profilePicture) {
            setProfilePicture(userResponse.data.profilePicture);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/Search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="Header-container">
      <Link to="/" className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          ></input>

          <button type="submit" className="search-button">
            <span className="search-button-icon">⚲</span>
          </button>
        </form>
      </div>
      <Link to="/profile" className="profile-picture-container">
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="profile-picture"
        />
      </Link>
    </div>
  );
};

export default Header;
