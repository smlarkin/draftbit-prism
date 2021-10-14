import React from 'react';
import './App.css';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel.gen';
import { AttributesProvider } from './context';

function App() {
  return (
    <div className="App">
      <AttributesProvider>
        <PropertiesPanel />
      </AttributesProvider>
    </div>
  );
}

export default App;
