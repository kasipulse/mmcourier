import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
// import DriverApp from './DriverApp'; // We will create this next

// MM Courier Navy & White Global Styles
const globalStyles = `
  body { margin: 0; font-family: 'Inter', sans-serif; background-color: #F4F7F9; }
  * { box-sizing: border-box; }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <style>{globalStyles}</style>
    <Router>
      <Routes>
        {/* The main Logistics Control Center */}
        <Route path="/" element={<AdminDashboard />} />
        
        {/* Placeholder for future Driver Mobile View */}
        <Route path="/driver" element={<div>Driver Mobile View - Coming Soon</div>} />
        
        {/* Add more routes for Invoicing or Customer tracking here */}
      </Routes>
    </Router>
  </React.StrictMode>
);
