import './LoginPage.css';
import axios from 'axios';
import { useState } from 'react';

const back_url = import.meta.env.VITE_BACKEND_URL;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [chosenForm, setChosenForm] = useState('login');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${back_url}/auth/login`,
        { username, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${back_url}/auth/register`,
        { username, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chosenForm == 'login') {
      await handleLogin();
    } else {
      await handleRegister();
    }
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
