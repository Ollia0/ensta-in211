import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    </div>
  );
};

export default Header;
