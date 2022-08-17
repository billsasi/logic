import { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Menu from './components/Menu';

function App() {
  const [savedShapes, setSavedShapes] = useState([]);
  const [newShape, setNewShape] = useState('');

  const handleClick = (e) => {
    console.log(savedShapes);
  };

  useEffect(() => {
    console.log(savedShapes);
  }, [savedShapes]);

  return (
    <div className="App">
      <Menu
        id="menu"
        setNewShape={setNewShape}
        setSavedShapes={setSavedShapes}
      />
      <Canvas
        id="canv"
        savedShapes={savedShapes}
        setSavedShapes={setSavedShapes}
        newShape={newShape}
        setNewShape={setNewShape}
      />
    </div>
  );
}

export default App;
