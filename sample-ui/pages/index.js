import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      await axios
        .get("http://localhost:3000/articles/read")
        .then((response) => {
          setArticles(response.data);
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

  const createPost = async () => {
    if (!title || !desc) {
      alert("Please enter task");
      return;
    }
    try {
      await axios.post("http://localhost:3000/articles/create", {
        title,
        desc,
      });
      setTitle("");
      setDesc("");
      fetchArticles();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occured while creating the new articles");
    }
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const editPost = async (article) => {
    const editingTitle = prompt("Edit?", article.title);
    const editingDesc = prompt("Edit?", article.desc);

    if ((editingTitle, editingDesc)) {
      try {
        await axios.put(`http://localhost:3000/articles/update/${article.id}`, {
          title: editingTitle,
          desc: editingDesc,
        });
        fetchArticles();
      } catch (error) {
        console.error("Error:", error);
        alert("An error occured while creating the new articles");
      }
    }
  };

  const deletePost = async (id) => {
    if (confirm("Delete?"))
      try {
        await axios.delete(`http://localhost:3000/articles/delete/${id}`, {
          title,
          desc,
        });
        fetchArticles();
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
            value={desc}
            onChange={handleChangeDesc}
          />
          <button
            className="mb-2 btn btn-outline btn-primary"
            onClick={createPost}
          >
            New task
          </button>
        </div>

        {articles.map((article) => (
          <div key={article.id} className="shadow card bg-violet-200 mb-5">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-1 text-blue-900">{article.title}</div>
                <div className="flex-1 text-blue-800">{article.desc}</div>
                <button
                  className="btn btn-outline btn-success mr-2"
                  onClick={() => editPost(article)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => deletePost(article.id)}
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
