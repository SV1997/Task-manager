// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  downloadTasksExcel,
  getTaskStats
} = require('../controllers/taskController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validator');

/**
 * @route   GET /api/tasks/download/excel
 * @desc    Download all tasks as Excel file
 * @access  Public (or can be made Private by adding authenticateToken)
 */
router.get('/download/excel',authenticateToken, downloadTasksExcel);

/**
 * @route   GET /api/tasks/stats
 * @desc    Get task statistics
 * @access  Public (or can be made Private by adding authenticateToken)
 */
router.get('/stats',authenticateToken, getTaskStats);

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Public (with optional auth) / Private (use authenticateToken instead of optionalAuth)
 */
router.post(
  '/',
  authenticateToken, // Change to authenticateToken if you want to make it private
  [
    body('author')
      .trim()
      .notEmpty()
      .withMessage('Author is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Author name must be between 2 and 100 characters'),
    body('division')
      .trim()
      .notEmpty()
      .withMessage('Division is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Division must be between 2 and 100 characters'),
    body('task')
      .trim()
      .notEmpty()
      .withMessage('Task description is required')
      .isLength({ min: 5, max: 1000 })
      .withMessage('Task description must be between 5 and 1000 characters'),
    body('dateOfTask')
      .notEmpty()
      .withMessage('Date of task is required')
      .isISO8601()
      .withMessage('Please provide a valid date'),
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed', 'cancelled'])
      .withMessage('Status must be one of: pending, in-progress, completed, cancelled'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high', 'urgent'])
      .withMessage('Priority must be one of: low, medium, high, urgent')
  ],
  validate,
  createTask
);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks with optional filters
 * @access  Public
 */
router.get('/',authenticateToken, getAllTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 * @access  Public
 */
router.get('/:id',authenticateToken, getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task
 * @access  Private
 */
router.put(
  '/:id',
  authenticateToken,
  [
    body('author')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Author name must be between 2 and 100 characters'),
    body('division')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Division must be between 2 and 100 characters'),
    body('task')
      .optional()
      .trim()
      .isLength({ min: 5, max: 1000 })
      .withMessage('Task description must be between 5 and 1000 characters'),
    body('dateOfTask')
      .optional()
      .isISO8601()
      .withMessage('Please provide a valid date'),
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed', 'cancelled'])
      .withMessage('Status must be one of: pending, in-progress, completed, cancelled'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high', 'urgent'])
      .withMessage('Priority must be one of: low, medium, high, urgent')
  ],
  validate,
  updateTask
);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Private
 */
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;
