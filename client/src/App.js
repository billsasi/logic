import { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Menu from './components/Menu';
import Home from './components/Home';
import axios from 'axios';
import { inspect } from 'util';

function App() {
  const [savedShapes, setSavedShapes] = useState([]);
  const [newShape, setNewShape] = useState('');
  const [proj, setProj] = useState(null);
  const [projects, setProjects] = useState([]);

  const addProject = async (proj) => {
    const { insertedId } = await axios.post('/projects/', proj);
    setProjects([...projects], { proj, _id: insertedId });
  };

  const editProject = async (proj) => {
    console.log(proj);
    proj.shapes = [3, 5];
    await axios.post('/projects/update/', proj);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/projects/');
      setProjects(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(savedShapes);
  }, [savedShapes]);

  return (
    <div className="App">
      {proj ? (
        <>
          <Menu
            id="menu"
            setProj={setProj}
            setNewShape={setNewShape}
            setSavedShapes={setSavedShapes}
          />

          <Canvas
            id="canv"
            proj={proj}
            savedShapes={savedShapes}
            setSavedShapes={setSavedShapes}
            newShape={newShape}
            setNewShape={setNewShape}
            editProject={editProject}
          />
        </>
      ) : (
        <Home
          projects={projects}
          handleAddProject={addProject}
          setProj={setProj}
        />
      )}
    </div>
  );
}

export default App;
