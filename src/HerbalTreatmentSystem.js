import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const HerbalTreatmentSystem = () => {
  const [complaint, setComplaint] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = {
    "Lavender": "1", 
    "Green Tea": "2",
    "Fennel": "3", 
    "Mint": "4",
    "Ginger": "5",
    "Turmeric": "6", 
    "Marjoram": "7",
    "Cinnamon": "8",
    "Felty Germander": "o3",
    "Thyme": "o2",
    "Rosemary": "o5",
    "Fenugreek": "o4",
    "Anise": "o8",
    "Cumin": "o6",
    "Sage": "o7",
    "Chamomile": "o1"
  };

  const productOptions = Object.keys(products).map(product => ({
    label: product,
    value: product
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (complaint.trim() === '' && selectedProducts.length === 0) {
      setError('Please enter a valid complaint or select a product.');
      return;
    }
    setError('');
    try {
      // Collect the keys of selected products
      const selectedProductKeys = selectedProducts.map(product => products[product.value]);

      // Send complaint and selected product keys to backend
      const response = await axios.post('https://backend-s5g3266vhq-zf.a.run.app/submit', {
        complaint,
        selectedProductKeys // Include selected product keys in the request body
      });

      // Get the concatenated keys from the response
      let newConcatenatedKeys = response.data.concatenated_keys;

      // Append the selected product keys to the concatenated keys
      selectedProductKeys.forEach(key => {
        newConcatenatedKeys += key;
      });

      // Set the result including the updated concatenated keys and selected product keys
      setResult({
        ...response.data,
        concatenated_keys: newConcatenatedKeys,
        selectedProductKeys // Include selected product keys in the result
      });
    } catch (error) {
      setError('An error occurred while processing your request. Please try again later.');
    }
  };

  const handleProductSelection = (selectedOptions) => {
    setSelectedProducts(selectedOptions || []);
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
        />

        <label htmlFor="products">Or pick a product:</label>
        <Select
          id="products"
          isMulti
          options={productOptions}
          value={selectedProducts}
          onChange={handleProductSelection}
          className="basic-multi-select"
          classNamePrefix="select"
        />

        <button type="submit">Submit</button>
      </form>

      {selectedProducts.length > 0 && (
        <div className="selected-products">
          <h3>Selected Products:</h3>
          <ul>
            {selectedProducts.map((product, index) => (
              <li key={index}>
                {product.label} 
              </li>
            ))}
          </ul>
        </div>
      )}

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
          <p><strong>Selected Product Keys:</strong> {result.selectedProductKeys.join(', ') || 'No selected products.'}</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default HerbalTreatmentSystem;
