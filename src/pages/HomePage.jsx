import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bharat Sathi - Data Explorer</h1>
          <p className="hero-description">
            Explore and analyze public data from the Government of India's open data platform.
            Access thousands of datasets with an intuitive interface.
          </p>
          <div className="hero-actions">
            <Link to="/resources">
              <Button variant="primary">Explore Resources</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Comprehensive Data</h3>
            <p>
              Access over 80,000 datasets from various government departments
              and organizations across India.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>Advanced Filtering</h3>
            <p>
              Filter data by organization type, sectors, and more to find exactly
              what you're looking for.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>Dynamic Data Display</h3>
            <p>
              View your selected data in intuitive tables with pagination for
              easy navigation through large datasets.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>API Integration</h3>
            <p>
              Direct integration with the data.gov.in API for up-to-date and
              accurate information.
            </p>
          </div>
        </div>
      </section>
      
      <section className="getting-started-section">
        <h2>Getting Started</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Get an API Key</h3>
            <p>
              Register at data.gov.in to obtain your API key for accessing
              the data resources.
            </p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Enter Your API Key</h3>
            <p>
              Enter your API key in the top right corner of the application
              to enable data access.
            </p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Explore Resources</h3>
            <p>
              Browse the resources, apply filters, and click on any resource
              to view detailed information.
            </p>
          </div>
        </div>
        
        <div className="cta">
          <Link to="/resources">
            <Button variant="primary">Start Exploring</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
