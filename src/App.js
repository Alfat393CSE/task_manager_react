import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task, priority, dueDate) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false, priority, dueDate },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Filter & Search
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    if (filter === "completed") return task.completed && matchesSearch;
    if (filter === "pending") return !task.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>Task Manager ✅</h1>

      <TaskForm addTask={addTask} />

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", margin: "10px 0", width: "70%" }}
      />

      {/* Filters */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />

      <button onClick={clearCompleted} style={{ marginTop: "15px", padding: "10px" }}>
        Clear Completed
      </button>
    </div>
  );
}

export default App;
