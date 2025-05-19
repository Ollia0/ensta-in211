import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import profile_placeholder from '../../assets/images/profilepicture_placeholder.png';

const back_url = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const navigate = useNavigate();
  const { username } = useParams();

  // Récupérer les données de l'utilisateur au chargement
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${back_url}/auth/checkauth`, {
          withCredentials: true,
        });
        // profile perso & pas connecté => redirige vers login
        if (!username && !response.data.authenticated) {
          navigate('/login');
          return;
        }
        // profil perso
        if (!username && response.data.authenticated) {
          setUser(response.data.user);
          return;
        }
        // view other profil
        setIsOwnProfile(false);
        const userResponse = await axios.get(
          `${back_url}/users/profile/${username}`,
        );
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get(`${back_url}/auth/logout`, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <img
              src={profile_placeholder}
              alt="Profile Picture"
              className="profile-details-picture"
            />
          </div>

          <div className="profile-details">
            <h2>{user?.username || 'Placeholder'}</h2>
          </div>
        </div>

        {isOwnProfile && (
          <div className="profile-actions">
            <button className="logout-button" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
