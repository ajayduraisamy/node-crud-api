function TaskItem({ task, onToggle, onEdit, onDelete }) {
    return (
        <li className="d-flex align-items-center mb-2">
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

            <button className="btn btn-sm btn-outline-primary mx-1" onClick={() => onEdit(task)}>✏️</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task._id)}>🗑</button>
        </li>
    );
}

export default TaskItem;
