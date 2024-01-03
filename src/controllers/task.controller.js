const Task = require("../models/task.model");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      text: req.body.text
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createTask
};
