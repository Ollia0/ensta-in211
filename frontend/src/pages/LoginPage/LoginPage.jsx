import './LoginPage.css';
import { useState, useEffect } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [chosenForm, setChosenForm] = useState('login');

  const handleSubmit = async (e) => {
    // todo
    return;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-selector">
          <button
            className={`chosen-form-button ${chosenForm === 'login' ? 'active' : ''}`}
            onClick={() => setChosenForm('login')}
          >
            Login
          </button>
          <button
            className={`chosen-form-button ${chosenForm === 'register' ? 'active' : ''}`}
            onClick={() => setChosenForm('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-form-field">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
          </div>
          <div className="login-form-film">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>

          <button type="submit">{chosenForm.toUpperCase()}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
