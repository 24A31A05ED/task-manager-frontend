import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/tasks", {
        title,
      });

      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={addTask} style={{ padding: "10px" }}>
        Add Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;