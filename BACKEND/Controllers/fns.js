const { createCustomError } = require("../Middleware/custom-error");
const Task = require("../Models/task");

const asyncWrapper = require("../Middleware/async");

const viewTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const viewTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No Task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const addTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No Task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteCompletedTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.deleteMany({ completed: true });
  return res.status(200).json({ task });
});

module.exports = {
  addTask,
  deleteTask,
  updateTask,
  viewTasks,
  viewTask,
  deleteCompletedTask,
};
