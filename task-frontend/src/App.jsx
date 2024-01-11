import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // load tasks
  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // create task
  const createTask = async (e) => {
    e.preventDefault();

    if (text.trim().length < 3) return;

    try {
      await api.post("/tasks", { text });
      setText("");
      loadTasks();
    } catch (e) {
      alert("Failed to create task");
    }

    setText("");
    loadTasks();
  };

  const toggleTask = async (task) => {
    try {
      await api.patch(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      loadTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>🚀 Node CRUD Task App</h2>

      <form onSubmit={createTask} style={{ marginBottom: 20 }}>

        <input
          style={{ padding: 8, marginRight: 8 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: 8 }}>
            <span
              onClick={() => toggleTask(task)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none"
              }}
            >
              {task.text}
            </span>


            <button
              style={{
                marginLeft: 10,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => deleteTask(task._id)}
            >
              🗑
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default App;
