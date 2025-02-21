// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CashFlowForm from './components/CashFlowForm/CashFlowForm';
import SavedProperties from './components/SavedProperties/SavedProperties';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Rental Property Analysis</h1>
          <nav>
            <a href="/">Home</a> | <a href="/form">New Analysis</a> | <a href="/saved">Saved Properties</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to the Rental Property Analysis Tool</h2>} />
            <Route path="/form" element={<CashFlowForm />} />
            <Route path="/saved" element={<SavedProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
