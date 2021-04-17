import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { FaWindowClose } from "react-icons/fa";
import DB from './db/firebase';

function TodoList({todo}) {
 
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // delete from firebase
  const deleteTodo = () => {
    DB.collection('todos').doc(todo.id).delete();
  };

  // update todo from firebase
  const updateTodo = () => {
    DB.collection('todos').doc(todo.id).set(
      {
        todo: input
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <div className="todo--list">
      <Modal open={open}>
        <div className="modal--container">
          <div className="modal">
          <TextField
            label={todo.todo}
            type="text"
            variant="outlined"
            value={input}
            color="#fff"
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="space"></span>
          <Button
            onClick={updateTodo}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!input}
          >
            <span className="add-btn">
              <UpdateIcon />
              Update
            </span>
          </Button>
          <FaWindowClose style={{marginLeft:"2rem"}} onClick={()=>setOpen(false)}/>
        </div>
        </div>
      </Modal>

      <List>
        <ListItem button>
          <ListItemText primary={todo.todo} />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={(e)=>setOpen(true)}
          >
            <EditIcon />
            <span>Edit</span>
          </Button>
          <span className="space"></span>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={deleteTodo}
          >
            <DeleteForeverIcon />
            <span>Remove</span>
          </Button>
        </ListItem>
      </List>
    </div>
  );
}

export default TodoList;
