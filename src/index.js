import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Find the root element in the HTML
const container = document.getElementById('root');

// Create a React root
const root = createRoot(container);

// Render the App component
root.render(<App />);
