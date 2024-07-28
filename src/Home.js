import React from 'react';
import './App.css';
import lavender from '/Users/ahdghazal/herb-craft/src/images/giphy.gif'; // Adjust the path according to your project structure

const Home = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      <p>Welcome to the Herbal Treatment System! Follow the instructions below to use the website:</p>
      <ul>
        <li>Navigate to the "Try Now!" page to enter your complaint and get a diagnosis.</li>
        <li>Contact us via the "Contact Us" page if you have any questions or feedback.</li>
      </ul>
      <img src={lavender} alt="Lavender" className="home-image" />
    </div>
  );
};

export default Home;
