const express = require('express');
const projectRouter = require('./routes/projects');

const PORT = 8000;

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('hello');
});

app.use('/api/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
