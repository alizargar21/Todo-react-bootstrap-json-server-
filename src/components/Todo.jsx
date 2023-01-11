import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Todo = ({ todo, deleteHandler, toggleHandler  , modelShowHandler}) => {


  return (
    <div
      id={todo.id}
      className="d-flex justify-content-between  my-2 mt-5 mx-3"
    >
      <h4
        className={
          todo.isCompleted ? "opacity-50 text-decoration-line-through " : ""
        }
        onDoubleClick={() => toggleHandler(todo)}
      >
        {todo.title}
      </h4>
      <div className="btn-group ">
        <Button
          onClick={() => toggleHandler(todo)}
          className="   bg-success border-0"
        >
          {todo.isCompleted ? (
            <i className="bi bi-arrow-counterclockwise"></i>
          ) : (
            <i className="bi bi-check-lg"></i>
          )}
        </Button>
        <Button onClick={()=> modelShowHandler(todo)} className="   bg-warning border-0">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button
          onClick={() => deleteHandler(todo)}
          className="  bg-danger border-0"
        >
          <i className="bi bi-trash3"></i>
        </Button>
      </div>
    </div>
  );
};

export default Todo;
