import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const styles = {
    appContainer: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#e9ecef',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    buttonContainer: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <Router>
      <div style={styles.appContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div style={styles.buttonContainer}>
                  <button
                    style={styles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                    onClick={() => window.location.href = '/login'}
                  >
                    Login
                  </button>
                  <button
                    style={styles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                    onClick={() => window.location.href = '/register'}
                  >
                    Register
                  </button>
                </div>
                <h1 style={styles.heading}>FILE UPLOAD AND MANAGE REACT APP</h1>
              </>
            }
          />
          <Route path="/files" element={<FileList />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;