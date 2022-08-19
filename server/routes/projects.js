const router = require('express').Router();
const {
  getProjects,
  addProject,
  updateProject,
} = require('../controllers/projectController');

router.route('/').get(getProjects).post(addProject);
router.route('/update').post(updateProject);

module.exports = router;
