import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import SymptomInput from './components/SymptomInput';
import HistoryDashboard from './components/HistoryDashboard';
import LanguageSelector from './components/LanguageSelector';
import './App.css';

function App() {
  const [userId] = useState('demo-user'); // In a real app, this would come from auth

  return (
    <LanguageProvider>
      <div className="App">
        <header className="App-header">
          <h1>Healthcare AI Symptom Assessment</h1>
          <LanguageSelector />
        </header>
        <main>
          <SymptomInput />
          <HistoryDashboard userId={userId} />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;