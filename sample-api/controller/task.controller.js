const fs = require("fs");

const getTask = async (req, res) => {
  const data = fs.readFileSync("tasks.json", "utf8");
  res.json(JSON.parse(data));
};

const createTask = async (req, res) => {
  const { title, desc } = req.body;
  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const taskId = Date.now();

  list.push({
    id: taskId,
    title: title,
    desc: desc,
  });

  fs.writeFileSync("tasks.json", JSON.stringify(list));
  res.json([{ status: "Success" }]);
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { desc } = req.body;

  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const elementIndex = list.findIndex((element) => element.id === Number(id));

  list[elementIndex].title = title;
  list[elementIndex].desc = desc;

  fs.writeFileSync("tasks.json", JSON.stringify(list));
  res.json([{ status: "Success" }]);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("tasks.json", JSON.stringify(newList));

  res.json([{ status: "Success" }]);
};

module.exports = {
  getTask,
  createTask,
  editTask,
  deleteTask,
};
