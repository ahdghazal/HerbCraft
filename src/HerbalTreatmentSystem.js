import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const HerbalTreatmentSystem = () => {
  const [complaint, setComplaint] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (complaint.trim() === '') {
      setError('Please enter a valid complaint.');
      return;
    }
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:npm/submit', { complaint });
      setResult(response.data);
    } catch (error) {
      setError('An error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Let's Find Your Remedy!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="complaint">Enter your complaint:</label>
        <input
          type="text"
          id="complaint"
          name="complaint"
          placeholder="E.g., stomach pain, headache"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />
      </form>
      {result && (
        <div className="result">
          <h2>Results</h2>
          <p><strong>Symptoms:</strong> {result.symptoms.length > 0 ? result.symptoms.join(', ') : 'No symptoms identified.'}</p>
          <p><strong>Diagnosis:</strong> {result.diagnosis.length > 0 ? result.diagnosis.join(', ') : 'No diagnosis found.'}</p>
          <p><strong>Treatment:</strong> {Object.keys(result.treatment).length > 0 ? Object.keys(result.treatment).join(', ') : 'No treatment available.'}</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default HerbalTreatmentSystem;
