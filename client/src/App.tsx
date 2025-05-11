import React, { useState } from 'react';
import ApplicationForm from './components/ApplicationForm';
import VerifierDashboard from './components/Dashboards/VerifierDashboard';
import Header from './components/Header';

import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<string>('applicationForm');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigate} />
      {currentView === 'applicationForm' && <ApplicationForm />}
      {currentView === 'verifierDashboard' && <VerifierDashboard />}
    </div>
  );
}

export default App;
