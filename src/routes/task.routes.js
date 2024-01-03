const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/task.controller");

// POST /tasks
router.post("/", createTask);

module.exports = router;
