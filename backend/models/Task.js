// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  division: {
    type: String,
    required: [true, 'Division is required'],
    trim: true,
  },
  task: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true,
  },
  dateOfTask: {
    type: Date,
    required: [true, 'Date of task is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
taskSchema.index({ author: 1 });
taskSchema.index({ division: 1 });
taskSchema.index({ dateOfTask: -1 });
taskSchema.index({ status: 1 });
taskSchema.index({ createdAt: -1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
