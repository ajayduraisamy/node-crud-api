function TaskItem({
    task,
    editingId,
    editText,
    setEditText,
    onToggle,
    onEdit,
    onSave,
    onCancel,
    onDelete,
}) {
    const isEditing = editingId === task._id;

    return (
        <li
            className="d-flex align-items-center mb-3 p-3 shadow-sm"
            style={{
                borderRadius: "14px",
                background: "linear-gradient(145deg, #0f172a, #020617)",
                color: "#e5e7eb",
                borderLeft: "4px solid #38bdf8",
                transition: "all 0.2s ease",
            }}
        >
            {isEditing ? (
                <>
                    <input
                        className="form-control me-2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{
                            background: "#020617",
                            borderColor: "#38bdf8",
                            color: "#e5e7eb",
                        }}
                    />

                    <button
                        className="btn btn-sm btn-success me-1"
                        onClick={onSave}
                    >
                        💾
                    </button>

                    <button
                        className="btn btn-sm btn-outline-light"
                        onClick={onCancel}
                    >
                        ❌
                    </button>
                </>
            ) : (
                <>
                    <span
                        onClick={() => onToggle(task)}
                        style={{
                            cursor: "pointer",
                            flex: 1,
                            fontSize: "16px",
                            fontWeight: "500",
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "#94a3b8" : "#f8fafc",
                            transition: "0.2s",
                        }}
                    >
                        {task.text}
                    </span>

                    <button
                        className="btn btn-sm btn-outline-info mx-1"
                        onClick={() => onEdit(task)}
                    >
                        ✏️
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(task._id)}
                    >
                        🗑
                    </button>
                </>
            )}
        </li>
    );
}

export default TaskItem;
