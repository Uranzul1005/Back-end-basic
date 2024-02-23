const express = require("express");
const {
  getTask,
  createTask,
  editTask,
  deleteTask,
} = require("../controller/task.controller");

const taskRouter = express.Router();

taskRouter.get("/read", getTask);
taskRouter.post("/create", createTask);
taskRouter.put("/update/:id", editTask);
taskRouter.delete("/delete/:id", deleteTask);

module.exports = taskRouter;
