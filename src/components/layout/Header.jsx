import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApiKey } from '../../context/ApiKeyContext';

const Header = () => {
  const { apiKey, setApiKey } = useApiKey();
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>Bharat Sathi</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname.includes('/resources') ? 'active' : ''}>
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </nav>
        
        <div className="api-key-input">
          <input
            type="text"
            placeholder="Enter API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            aria-label="API Key"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
