import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import TryNow from './TryNow';
import ContactUs from './ContactUs';
import AdminDashboard from './AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <video className="background-video" autoPlay loop muted>
          <source src={require('./images/background.jpg')} type="video/mp4" />
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
    </Router>
  );
}

export default App;
