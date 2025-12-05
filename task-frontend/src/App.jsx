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
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
