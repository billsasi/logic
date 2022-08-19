import React from 'react';

const Menu = ({ setNewShape, setProj }) => {
  return (
    <div className="menu">
      <div>
        <button onClick={() => setNewShape('and')}>AND</button>
        <button onClick={() => setNewShape('or')}>OR</button>
        <button onClick={() => setNewShape('not')}>NOT</button>
        <button onClick={() => setNewShape('sw')}>SW</button>
      </div>
      <button id="save">Save</button>
      <button id="save" onClick={(e) => setProj(null)}>
        Open
      </button>
    </div>
  );
};

export default Menu;
