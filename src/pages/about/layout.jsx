// src/pages/about/layout.jsx
import React from "react";
import { Link } from "react-router-dom"; // Optional: for adding navigation links

const AboutLayout = ({ children }) => {
  return (
    <div>
      <header style={{ padding: '10px', backgroundColor: '#f4f4f4', marginBottom: '20px' }}>
        <h3>About Layout Header</h3>
        {/* Add navigation or other elements in header */}
        <nav>
          <ul>
            <li>
              <Link to="/about">About Home</Link>
            </li>
            <li>
              <Link to="/about/home">About Subpage</Link>
            </li>
            {/* Add more links if needed */}
          </ul>
        </nav>
      </header>

      {/* Main content area where nested routes will be rendered */}
      <main>{children}</main>

      <footer style={{ padding: '10px', backgroundColor: '#f4f4f4', marginTop: '20px' }}>
        <h3>Layout Footer</h3>
        {/* Add footer content */}
      </footer>
    </div>
  );
};

export default AboutLayout;
