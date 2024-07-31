import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:7865/todos");
    setTodos(response.data);
  };
  const addTodo = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:7865/todos", { text: newTodo });
    setNewTodo("");
    fetchTodos();
  };
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:7865/todos/${id}`);
    fetchTodos();
  };
  return (
    <div className="App">
      <h1>To-Do App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
