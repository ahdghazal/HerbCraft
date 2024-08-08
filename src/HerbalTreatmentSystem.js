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
      const response = await axios.post('http://127.0.0.1:4000/submit', { complaint });
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
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div className="result">
          <h2>Results</h2>
          <p><strong>Symptoms:</strong> {result.symptoms.length > 0 ? result.symptoms.join(', ') : 'No symptoms identified.'}</p>
          <p><strong>Diagnosis:</strong> {result.diagnosis.length > 0 ? result.diagnosis.join(', ') : 'No diagnosis found.'}</p>
          <p><strong>Herbs for Treatment:</strong></p>
          <ul>
            {Array.isArray(result.herbs) && result.herbs.length > 0 ? (
              result.herbs.map((herb, index) => (
                <li key={index}>
                  {herb} (Key: {result.treatment_keys[index]})
                </li>
              ))
            ) : (
              <li>No herbs identified.</li>
            )}
          </ul>
          <p><strong>Concatenated Treatment Keys:</strong> {result.concatenated_keys || 'No concatenated keys available.'}</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default HerbalTreatmentSystem;
