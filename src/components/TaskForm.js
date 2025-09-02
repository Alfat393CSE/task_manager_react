import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task..."
        style={{ padding: "10px", width: "70%" }}
      />
      <button type="submit" style={{ padding: "10px 15px", marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}

export default TaskForm;
