import { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  const [savedShapes, setSavedShapes] = useState([]);

  const handleClick = (e) => {
    console.log(savedShapes);
  };

  useEffect(() => {
    console.log(savedShapes);
  }, [savedShapes]);

  return (
    <div className="App">
      <Canvas
        savedShapes={savedShapes}
        setSavedShapes={setSavedShapes}
      ></Canvas>
    </div>
  );
}

export default App;
