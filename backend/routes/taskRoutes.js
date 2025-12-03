const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
  createTaskValidationRules,
  updateTaskValidationRules,
  validateTask,
} = require('../middleware/validateTask');
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post(
  '/',
  createTaskValidationRules,
  validateTask,
  taskController.createTask
);

router.put(
  '/:id',
  updateTaskValidationRules,
  validateTask,
  taskController.updateTask
);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
