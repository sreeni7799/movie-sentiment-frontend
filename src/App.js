import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');

  // Test connection to backend
  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => {
        setBackendStatus(data.message);
      })
      .catch(error => {
        setBackendStatus('Backend not connected');
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Movie Sentiment Analysis</h1>
        <p>Backend Status: {backendStatus}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Upload CSV File</h2>
          <input type="file" accept=".csv" />
          <button>Process Reviews</button>
        </div>
      </header>
    </div>
  );
}

export default App;