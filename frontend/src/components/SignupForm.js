// components/SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', { username, password, role });
      navigate('/login');
    } catch {
      setError('Signup failed. Try a different username.');
    }
  }; 
    const handleRegister = () => {
      navigate('/login');
    };

  return (
    <form className="container" onSubmit={handleSubmit}>
       <h1>Welcome to MedTracker</h1>
      <p>Sign up to manage your medications or access your caretaker dashboard</p>
      <h2>Sign Up</h2>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="caretaker">Caretaker</option>
      </select>
      <button type="submit">Register</button>
      <button onClick={handleRegister} type='button'>Login</button>
    </form>
  );
}

export default SignupForm;