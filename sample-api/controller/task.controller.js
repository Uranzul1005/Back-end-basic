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
// test
const getTask = async (req, res) => {
  const result = await sql`select * from task`;
  res.json(result);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  await sql`insert into task values(${Date.now()}, ${title}, ${description})`;

  res.json([{ status: "Success" }]);
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { description } = req.body;

  await sql`update task set title = ${title}, description = ${description} where id = ${id}`;

  res.json([{ status: "Success" }]);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  await sql`delete from task where id = ${id}`;

  res.json([{ status: "Success" }]);
};

module.exports = {
  getTask,
  createTask,
  editTask,
  deleteTask,
};
