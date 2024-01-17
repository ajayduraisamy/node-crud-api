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
        <li className="d-flex align-items-center mb-2">
            {isEditing ? (
                <>
                    <input
                        className="form-control me-2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />

                    <button
                        className="btn btn-sm btn-success me-1"
                        onClick={onSave}
                    >
                        💾
                    </button>

                    <button
                        className="btn btn-sm btn-secondary"
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
                            textDecoration: task.completed ? "line-through" : "none",
                            flex: 1,
                        }}
                    >
                        {task.text}
                    </span>

                    <button
                        className="btn btn-sm btn-outline-primary mx-1"
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
