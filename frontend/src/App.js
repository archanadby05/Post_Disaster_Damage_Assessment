import React, { useState } from 'react';
import InputForm from './components/InputForm';
import MapDisplay from './components/MapDisplay';
import DashboardSidebar from './components/DashboardSidebar';
import LeftSidebar from './components/LeftSidebar';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="App">
      <InputForm />

      <div className="main-layout">
        <div className={`left-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <button onClick={toggleSidebar}>
            {isSidebarCollapsed ? '☰' : '✖'}
          </button>
          {!isSidebarCollapsed && <LeftSidebar />}
        </div>

        <div className="map-display">
          <MapDisplay />
        </div>

        <div className="dashboard-sidebar">
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
