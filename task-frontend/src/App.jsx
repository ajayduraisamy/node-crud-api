import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ loading state
  const [loading, setLoading] = useState(false);

  // load tasks
  const loadTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
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
    if (editText.trim().length < 3) return alert("Text too short");

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
    <div className="container" style={{ maxWidth: "700px" }}>
      <Navbar />

      {/* Premium App Card */}
      <div
        className="p-4 shadow-lg"
        style={{
          background: "linear-gradient(145deg, #020617, #0f172a)",
          borderRadius: "16px",
          marginTop: "20px",
        }}
      >
        <h2
          className="mb-3 text-center"
          style={{
            background: "linear-gradient(90deg,#38bdf8,#6366f1)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: "700",
          }}
        >
          🚀 Node CRUD Task App
        </h2>

        <form onSubmit={createTask} className="d-flex mb-4">
          <input
            className="form-control me-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new task..."
            style={{
              background: "#020617",
              color: "#e5e7eb",
              border: "1px solid #38bdf8",
            }}
          />
          <button className="btn btn-info fw-bold text-dark">Add</button>
        </form>

        {/* ✅ Loading Indicator */}
        {loading && (
          <div
            className="alert alert-info text-center py-2"
            style={{ background: "#020617", color: "#38bdf8" }}
          >
            Loading tasks...
          </div>
        )}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              onToggle={toggleTask}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={() => setEditingId(null)}
              onDelete={deleteTask}
            />
          ))}
        </ul>

        <p className="text-center text-secondary mt-3">
          Total tasks: {tasks.length}
        </p>
      </div>
    </div>
  );
}

export default App;
