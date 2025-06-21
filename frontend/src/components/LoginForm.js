// components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axiosInstance';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data);
      navigate('/dashboard');
    } catch {
      setError('Invalid username or password');
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <h1>Welcome to MedTracker</h1>
        <p>Sign in to manage your medications or access your caretaker dashboard</p>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button onClick={handleRegister} type="button">Register</button>
      </form>
      <div className='container'>
        <p>Demo Credentials:<br/>
          Patient: patient@example.com / demo123<br/>
          Caretaker: caretaker@example.com / demo123</p>
      </div>
    </div>
  );
}

export default LoginForm;

