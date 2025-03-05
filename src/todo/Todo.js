import React, { useState } from "react";
import { InputBase, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const deleteItem = props.deleteItem;
  const editItem = props.editItem;

  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    editItem(item);
  };

  const editEventHandler = (e) => {
    setItem({...item, title : e.target.value});
  };

  const deleteEventHandler = () => {
    deleteItem(item);
  };

  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
  };

  const turnOffREadOnly = () => {
    setReadOnly(false);
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{"aria-label" : "naked", readOnly : readOnly}}
          onClick={turnOffREadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="checkbox"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo"
          onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;