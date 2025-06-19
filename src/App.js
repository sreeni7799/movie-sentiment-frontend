import React, { useState, useEffect } from 'react';
import CSVUploadForm from './components/CSVUploadForm';
import ResultsDisplay from './components/ResultsDisplay';
import { uploadCSV, fetchResults, testBackendConnection } from './services/api';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkBackend();
    loadResults();
  }, []);

  const checkBackend = async () => {
    try {
      const data = await testBackendConnection();
      setBackendStatus('Connected');
    } catch (error) {
      setBackendStatus('Not connected');
    }
  };

  const loadResults = async () => {
    try {
      const data = await fetchResults();
      setResults(data.results || []);
    } catch (error) {
      console.error('Failed to load results');
    }
  };

  const handleCSVUpload = async (file) => {
    setIsLoading(true);
    try {
      const result = await uploadCSV(file);
      await loadResults(); // Refresh results after upload
      return { 
        success: true, 
        message: `Successfully processed ${result.processed_count} reviews` 
      };
    } catch (error) {
      return { success: false, error: 'Failed to process CSV file' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Movie Sentiment Analysis - CSV Upload</h1>
      <p>Backend: {backendStatus}</p>
      
      <CSVUploadForm 
        onUpload={handleCSVUpload}
        isLoading={isLoading}
      />
      
      <ResultsDisplay results={results} />
    </div>
  );
}

export default App;