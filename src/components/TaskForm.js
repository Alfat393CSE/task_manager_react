import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text, priority, dueDate);
    setText("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task..."
        style={{ padding: "10px", width: "40%" }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" style={{ padding: "10px 15px", marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
}

export default TaskForm;
