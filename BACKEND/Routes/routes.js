const express = require("express");
const taskRouter = express.Router();
const {
  viewTask,
  addTask,
  updateTask,
  deleteTask,
  viewTasks,
  deleteCompletedTask,
} = require("../Controllers/fns");

taskRouter.get("/get/", viewTasks);

taskRouter.get("/get/:id", viewTask);

taskRouter.post("/post/", addTask);

taskRouter.patch("/patch/:id", updateTask);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.delete("/deleteCompleted/", deleteCompletedTask);
module.exports = { taskRouter };
  