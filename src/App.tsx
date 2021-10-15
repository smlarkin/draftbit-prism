import './App.css';
import { PropertiesPanel } from './components/PropertiesPanel/PropertiesPanel.gen';
import { AttributesProvider } from './contexts';

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
