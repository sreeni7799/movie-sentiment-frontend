const API_URL = 'http://localhost:5000/api';

export const testBackendConnection = async () => {
  const response = await fetch(`${API_URL}/test`);
  return response.json();
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('csv_file', file);

  const response = await fetch(`${API_URL}/analyze-csv`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload CSV');
  }

  return response.json();
};

export const fetchResults = async () => {
  const response = await fetch(`${API_URL}/results`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch results');
  }

  return response.json();
};