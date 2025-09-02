import React, { useState } from "react";

function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        margin: "10px 0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              flexGrow: 1,
              textAlign: "left",
            }}
          >
            {task.text} {" "}
            <small>({task.priority})</small> {" "}
            {task.dueDate && <small>📅 {task.dueDate}</small>}
          </span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => deleteTask(task.id)}>❌</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
