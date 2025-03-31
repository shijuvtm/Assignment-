import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Update to useNavigate
import axios from 'axios'

function Register() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    height:' 27%',
    width: '100%',
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const headingStyle = {
    marginBottom: '20px',
    color: '#333',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", { email, password });
      alert("Registered successfully and redirecting to login page");
      navigate("/login"); // Replace history.push with navigate
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setuserName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}

export default Register;