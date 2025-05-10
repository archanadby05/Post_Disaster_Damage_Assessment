// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapDisplay from './components/MapDisplay';
import DashboardSidebar from './components/DashboardSidebar';
import InputForm from './components/InputForm'; // Import your form
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default dashboard with map and sidebar */}
        <Route path="/" element={
          <div className="main-layout">
            <div className="map-display">
              <MapDisplay />
            </div>
            <div className="dashboard-sidebar">
              <DashboardSidebar />
            </div>
          </div>
        } />

        <Route path="/form" element={<InputForm />} />
      </Routes>
    </Router>
  );
}

export default App;
