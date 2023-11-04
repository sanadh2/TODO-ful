const express = require("express");
const taskRouter = express.Router();
const {
  viewTask,
  addTask,
  updateTask,
  deleteTask,
  viewTasks,
} = require("../Controllers/fns");

taskRouter.get("/", viewTasks);

taskRouter.get("/:id", viewTask);

taskRouter.post("/", addTask);

taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

module.exports = { taskRouter };
