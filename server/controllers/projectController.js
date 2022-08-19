const getDb = require('../db');

const getProjects = async (req, res) => {
  const db = await getDb();
  const projects = db.collection('projects');
  const result = await projects.find().toArray();
  res.json(result);
};

const addProject = async (req, res) => {
  const { body } = req;
  const { name, shapes } = body;
  const db = await getDb();
  const projects = db.collection('projects');
  const result = await projects.insertOne({
    name,
    shapes,
    createdAt: new Date(),
  });
  res.json(result);
};

const updateProject = async (req, res) => {
  const db = await getDb();
  const projects = db.collection('projects');
  const result = await projects.updateOne(
    { _id: body._id },
    {
      shapes: body.shapes,
      editedAt: new Date(),
    }
  );
  res.json(result);
};

module.exports = { getProjects, addProject, updateProject };
