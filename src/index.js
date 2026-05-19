import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import DriverApp from './DriverApp'; // Add this import

const globalStyles = `
  body { margin: 0; font-family: 'Inter', sans-serif; background-color: #F4F7F9; }
  * { box-sizing: border-box; }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/driver" element={<DriverApp />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
