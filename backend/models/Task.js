const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema(
  {
    text: { type: String, trim: true },
    done: { type: Boolean, default: false },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    dueAt: {
      type: Date,
    },
    done: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    subtasks: [subtaskSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
