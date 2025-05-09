import React from 'react';
import InputForm from './components/InputForm';
import MapDisplay from './components/MapDisplay';
import DashboardSidebar from './components/DashboardSidebar';

function App() {
  return (
    <div className="App">
      <InputForm />
      <div className="main-content">
        <MapDisplay />
        <DashboardSidebar />
      </div>
    </div>
  );
}

export default App;
