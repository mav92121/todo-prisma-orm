import axios from "axios";
import React, { useState, useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [rerender, setRerender] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const todos = await axios.get("http://localhost:3001");
      setTodos(todos.data);
    };
    fetch();
  }, [rerender]);
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3001/todo/${id}`);
    setRerender(!rerender);
    console.log("res -> ", res);
  };
  const handleAddTodo = async () => {
    const res = await axios.post("http://localhost:3001/todo", {
      title,
    });
    setRerender(!rerender);
  };

  return (
    <>
      <input
        style={{ padding: "5px" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => handleAddTodo()}
        style={{ marginLeft: "20px", padding: "5px", cursor: "pointer" }}
      >
        submit
      </button>
      <br />
      <br />
      <br />
      {todos?.map((todo) => (
        <>
          <div>{todo?.title}</div>
          <div>
            <button>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </>
      ))}
    </>
  );
};

export default Todo;
