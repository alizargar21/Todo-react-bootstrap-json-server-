import React, { useEffect, useState, useId } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const TodoForms = ({ addTodo  , filterTodos}) => {
  const [todo, setTodo] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();

    addTodo(todo);

    setTodo("");
  };
  const selectHandler = (e) => {
    console.log(e.target.value);
    filterTodos(e.target.value)
  };
  return (
    <Form onSubmit={submitHandler} className="mx-2">
      <Form.Group>
        <Row>
          <Col className="col-6 ">
            <Form.Control
              size="sm"
              className="bg-dark text-light"
              type="text"
              placeholder="Enter todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </Col>
          <Col className="col-2">
            <Button type="submit" size="sm">
              Add
            </Button>
          </Col>
          <Col className="col-4 ">
            <Form.Select className="bg-dark text-light" onChange={(e) => selectHandler(e)}>
              <option value={"all"}>All</option>
              <option value={"completed"}>Completed</option>
              <option value={"uncompleted"}>Uncompleted</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default TodoForms;
