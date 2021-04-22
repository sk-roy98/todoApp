import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { CgPlayListAdd } from 'react-icons/cg';
import TodoList from './TodoList';
import DB from './db/firebase.js';

function Todo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // fetch data from firebase
  useEffect(() => {
    console.log("inside useeffect")
    DB.collection('todos')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  //input todo
  const handleChange = (e) => {
    setInput(e.target.value);
  };


 const addTodos = (e) => {

    if (input === '') {
      e.preventDefault();
      alert('Type Something ');
    } else {
      //insert into firebase
      e.preventDefault();
      const val= DB.collection('todos').add({
        todo: input,
      });
      //separate
      setTodos([...todos, val]);
      setInput('');
    }
  };
  console.log(todos);

  return (
    <div className="container">
      <h1>
        Todo App
        <span role="img">
          ✅
        </span>
      </h1>

      <form>
        <TextField
          label="Add a task..."
          type="text"
          variant="outlined"
          value={input}
          onChange={handleChange}
        />
        <span className="space"></span>
        <Button
          onClick={addTodos}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!input}
        >
          <CgPlayListAdd className="add-btn" /> Add
        </Button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoList todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
