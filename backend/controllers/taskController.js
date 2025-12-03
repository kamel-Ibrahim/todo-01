const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try {
    const { search, category, sortBy, includeArchived } = req.query;

    const query = {
      owner: req.user.id,
    };

    if (includeArchived !== 'true') {
      query.archived = false;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    let sortOption = { createdAt: -1 }; 

    if (sortBy === 'title') {
      sortOption = { title: 1 };
    } else if (sortBy === 'dueAt') {
      sortOption = { dueAt: 1 };
    } else if (sortBy === 'category') {
      sortOption = { category: 1 };
    }

    const tasks = await Task.find(query).sort(sortOption);

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, category, dueAt, subtasks } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description: description || '',
      category: category || '',
      dueAt: dueAt || null,
      subtasks: subtasks || [],
      done: false,
      owner: req.user.id,
      archived: false,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (Array.isArray(updates.subtasks) && updates.subtasks.length > 0) {
      const allDone = updates.subtasks.every((s) => s.done === true);
      if (allDone) {
        updates.done = true;
        updates.completedAt = new Date();
      } else if (updates.done === true) {
      } else if (updates.done === false) {
        updates.completedAt = null;
      }
    }

    if (typeof updates.done === 'boolean' && !updates.subtasks) {
      if (updates.done === true) {
        updates.completedAt = new Date();
      } else {
        updates.completedAt = null;
      }
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { archived: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task archived' });
  } catch (err) {
    next(err);
  }
};
