const express = require("express");
const fs = require("node:fs");
var cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/articles/read", (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");
  res.json(JSON.parse(data));
});

app.post("/articles/create", (req, res) => {
  const { title, desc } = req.body;
  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const articleId = Date.now();

  list.push({
    id: articleId,
    title: title,
    desc: desc,
  });

  fs.writeFileSync("articles.json", JSON.stringify(list));
  res.json([{ status: "Success" }]);
});

app.put("/articles/update/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  res.json([{ status: "Success" }]);
});

app.delete("/articles/delete/:id", (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("articles.json", JSON.stringify(newList));

  res.json([{ status: "Success" }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
