import React, { useState } from 'react';

const InputForm = ({ handleAddProject }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(handleAddProject);
    handleAddProject({
      name: name,
      shapes: [],
    });
  };
  return (
    <form id="new-proj-form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button className="submit">Create</button>
    </form>
  );
};

export default InputForm;
