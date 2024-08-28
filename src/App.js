import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Only import Route and Routes
import Header from './Header';
import Home from './Home';
import TryNow from './TryNow';
import ContactUs from './ContactUs';
import AdminDashboard from './AdminDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/try-now" element={<TryNow />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
