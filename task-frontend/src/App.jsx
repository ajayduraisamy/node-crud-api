import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // load tasks
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    }
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
      console.error(e);
      alert("Failed to create task");
    }
  };

  // toggle complete
  const toggleTask = async (task) => {
    try {
      await api.patch(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  // start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  // save edited task
  const saveEdit = async () => {
    if (editText.trim().length < 3)
      return alert("Text too short");

    try {
      await api.patch(`/tasks/${editingId}`, {
        text: editText,
      });

      setEditingId(null);
      setEditText("");
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  return (
    
    <div style={{ padding: "24px" }}>
      <Navbar />

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

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: 8 }}>

            {editingId === task._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button
                  style={{ marginLeft: 6 }}
                  onClick={saveEdit}
                >
                  💾
                </button>

                <button
                  style={{ marginLeft: 4 }}
                  onClick={() => setEditingId(null)}
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(task)}
                  style={{
                    cursor: "pointer",
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.text}
                </span>

                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => startEdit(task)}
                >
                  ✏️
                </button>

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
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
