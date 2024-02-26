const fs = require("fs");
const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const getTask = async (req, res) => {
  const result = await sql`select * from task`;
  res.json(result);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const taskId = Date.now();

  list.push({
    id: taskId,
    title: title,
    description: description,
  });

  fs.writeFileSync("tasks.json", JSON.stringify(list));
  res.json([{ status: "Success" }]);
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { description } = req.body;

  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);

  const elementIndex = list.findIndex((element) => element.id === Number(id));

  list[elementIndex].title = title;
  list[elementIndex].description = description;

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
