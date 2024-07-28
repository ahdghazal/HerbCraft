import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '/Users/ahdghazal/herb-craft/src/images/logo.png'; // Adjust the path according to your project structure

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/try-now">Try Now!</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

