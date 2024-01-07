const Task = require("../models/task.model");
// Task Controller for CRUD + Query Features

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      text: req.body.text,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// GET ALL TASKS with filter + search
const getTasks = async (req, res) => {
  try {
    const { status, q } = req.query;
    const query = {};

    // filter by completed status
    if (status === "done") query.completed = true;
    if (status === "active") query.completed = false;

    // search by text
    if (q) {
      query.text = { $regex: q, $options: "i" };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TASK BY ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: " Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask
    ,
 deleteTask};

