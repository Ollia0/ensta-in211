import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import profile_placeholder from '../../assets/images/profilepicture_placeholder.png';

const back_url = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const imageUrlInputRef = useRef(null);
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
          const currentUser = response.data.user;
          setUser(currentUser);
          const userResponse = await axios.get(
            `${back_url}/users/profile/${currentUser.username}`,
          );
          setDescription(userResponse.data.description || '');
          setProfilePicture(userResponse.data.profilePicture || '');
          return;
        }
        // view other profil
        setIsOwnProfile(false);
        const userResponse = await axios.get(
          `${back_url}/users/profile/${username}`,
        );
        setUser(userResponse.data);
        setDescription(userResponse.data.description || '');
        setProfilePicture(userResponse.data.profilePicture || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, username]);

  // Focus sur l'input quand il devient visible
  useEffect(() => {
    if (showImageUrlInput && imageUrlInputRef.current) {
      imageUrlInputRef.current.focus();
    }
  }, [showImageUrlInput]);

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

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setShowImageUrlInput(false);
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `${back_url}/users/profile`,
        {
          description,
          profilePicture,
        },
        { withCredentials: true },
      );
      setEditMode(false);
      setUser((prev) => ({ ...prev, description, profilePicture }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const toggleImageUrlInput = () => {
    if (editMode) {
      setShowImageUrlInput(!showImageUrlInput);
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const saveImageUrl = () => {
    if (imageUrl.trim()) {
      setProfilePicture(imageUrl);
      setShowImageUrlInput(false);
      setImageUrl('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveImageUrl();
    } else if (e.key === 'Escape') {
      setShowImageUrlInput(false);
      setImageUrl('');
    }
  };

  const seeProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <div
              className={`avatar-container ${editMode ? 'editable' : ''}`}
              onClick={toggleImageUrlInput}
            >
              <img
                src={profilePicture || profile_placeholder}
                alt="Profile Picture"
                className="profile-details-picture"
              />
              {editMode && (
                <div className="avatar-edit-overlay">
                  <span>Edit</span>
                </div>
              )}
            </div>

            {showImageUrlInput && (
              <div className="image-url-input-container">
                <input
                  ref={imageUrlInputRef}
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  onKeyDown={handleKeyDown}
                  className="image-url-input"
                />
                <div className="image-url-actions">
                  <button onClick={saveImageUrl} className="save-image-btn">
                    Save
                  </button>
                  <button
                    onClick={() => setShowImageUrlInput(false)}
                    className="cancel-image-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="profile-name">
            <h2>{user?.username || 'Placeholder'}</h2>
          </div>
        </div>

        {editMode ? (
          <div className="profile-edit">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="profile-description-edit"
              placeholder="Write your description here..."
            />
            <div className="edit-actions">
              <button className="save-button" onClick={updateProfile}>
                Save
              </button>
              <button className="cancel-button" onClick={toggleEditMode}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-description">
            <h3>Description:</h3>
            <p>{description || 'No description available'}</p>
          </div>
        )}

        {isOwnProfile && !editMode && (
          <div className="profile-actions">
            <button className="profile-action-button" onClick={handleLogout}>
              LOGOUT
            </button>
            <button className="profile-action-button" onClick={toggleEditMode}>
              EDIT PROFILE
            </button>
            <button className="profile-action-button" onClick={seeProfile}>
              SEE PROFILE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
