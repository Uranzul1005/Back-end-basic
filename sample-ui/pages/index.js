import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      await axios.get("http://localhost:3000/tasks/read").then((response) => {
        setTasks(response.data);
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occured while creating the new articles");
    }
  };

  // function fetchArticles() {
  //   axios.get("http://localhost:3000/tasks").then((response) => {
  //     setArticles(response.data);
  //   });
  // }

  const createTask = async () => {
    if (!title || !description) {
      alert("Please enter task");
      return;
    }
    try {
      await axios.post("http://localhost:3000/tasks/create", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      getTask();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occured while creating the new articles");
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
  };

  const editTask = async (task) => {
    const editedTitle = prompt("Edit?", task.title);
    const editedDesc = prompt("Edit?", task.description);

    if ((editedTitle, editedDesc)) {
      try {
        await axios.put(`http://localhost:3000/tasks/update/${task.id}`, {
          title: editedTitle,
          description: editedDesc,
        });
        getTask();
      } catch (error) {
        console.error("Error:", error);
        alert("An error occured while creating the new articles");
      }
    }
  };

  const deleteTask = async (id) => {
    if (confirm("Delete?"))
      try {
        await axios.delete(`http://localhost:3000/tasks/delete/${id}`, {
          title,
          description,
        });
        getTask();
      } catch (error) {
        console.error("Error:", error);
        alert("An error occured while creating the new articles");
      }
  };

  return (
    <main>
      <div className="container mx-auto my-10 ">
        <div className="mb-3">
          <input
            type="text"
            className="mr-2 input"
            placeholder="Title"
            value={title}
            onChange={handleChangeTitle}
          />
          <input
            type="text"
            className="mr-2 input"
            placeholder="Description"
            value={description}
            onChange={handleChangeDesc}
          />
          <button
            className="mb-2 btn btn-outline btn-primary"
            onClick={createTask}
          >
            New task
          </button>
        </div>

        {tasks.map((task) => (
          <div key={task.id} className="shadow card bg-violet-200 mb-5">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-1 text-blue-900">{task.title}</div>
                <div className="flex-1 text-blue-800">{task.description}</div>
                <button
                  className="btn btn-outline btn-success mr-2"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
