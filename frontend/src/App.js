import React, { useState } from 'react';
import InputForm from './components/InputForm';
import MapDisplay from './components/MapDisplay';
import DashboardSidebar from './components/DashboardSidebar';
import LeftSidebar from './components/LeftSidebar';
import './App.css';

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div className="App">
      {!isFormSubmitted && <InputForm onSubmit={handleFormSubmit} />}

      {isFormSubmitted && (
        <div className="main-layout">
          <div className="left-sidebar">
            <LeftSidebar />
          </div>

          <div className="map-display">
            <MapDisplay />
          </div>

          <div className="dashboard-sidebar">
            <DashboardSidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
