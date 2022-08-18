import React, { useState } from 'react';
import InputForm from './InputForm';

const Home = ({ projects, handleAddProject, setProj }) => {
  const [showInput, setShowInput] = useState(false);
  const [newProj, setNewProj] = useState({
    name: '',
    shapes: [],
  });

  const { name } = newProj;

  return (
    <div className="home-menu">
      <button onClick={() => setShowInput(!showInput)}>New Project</button>
      {showInput && <InputForm handleAddProject={handleAddProject} />}
      <div className="project-list">
        {projects.map((item) => (
          <div
            className="list-item"
            key={item._id}
            onClick={() => setProj(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
