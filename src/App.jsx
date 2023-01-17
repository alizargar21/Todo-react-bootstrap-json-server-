import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import TodoForms from "./components/TodoForms";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";

import http from "./service/todo-service";
import EditHandler from "./components/EditHandler";
function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [modalState, setModalState] = useState(false);
  const [editedValue, setEditedValue] = useState({});

  const modelShowHandler = (item) => {
    setModalState(!modalState);
    setEditedValue(item);
  };
  const saveEditHandler = async (item) => {
    try {
      const index = todos.findIndex((todo) => todo.id === item.id);
      const selectedTodo = todos[index];
      if (selectedTodo.title !== editedValue.title) {
        selectedTodo.title = editedValue.title;
        const updatedTodos = [...todos];
        updatedTodos[index] = selectedTodo;
        setTodos(updatedTodos);
        setFilteredTodos(updatedTodos);
        await http.put(`/todos/${selectedTodo.id}`, selectedTodo);
      }
      setModalState(false);
    } catch (error) {
      alert(error);
    }
  };

  const filterTodos = async (value) => {
    switch (value) {
      case "all": {
        setFilteredTodos(todos);
        break;
      }
      case "completed": {
        const completedTodo = todos.filter((item) => item.isCompleted);
        setFilteredTodos(completedTodo);
        break;
      }
      case "uncompleted": {
        const uncompleted = todos.filter((item) => !item.isCompleted);
        setFilteredTodos(uncompleted);
        break;
      }
      default:
        return setFilteredTodos(todos);
    }
  };

  const toggleHandler = async (item) => {
    try {
      const { data } = await http.get("/todos");
      const index = data.findIndex((todo) => todo.id === item.id);
      const selectedTodo = data[index];

      selectedTodo.isCompleted = !selectedTodo.isCompleted;
      const updatedTodos = [...data];
      updatedTodos[index] = selectedTodo;
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      await http.put(`/todos/${item.id}`, selectedTodo);
    } catch (error) {
      alert(error);
    }
  };

  const deleteHandler = async (item) => {
    try {
      const updatedTodos = todos.filter((todo) => todo.id !== item.id);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      const { data } = await http.get("/todos");
      const selectedTodo = data.find((todo) => {
        return todo.id === item.id;
      });

      const res = await http.delete(`/todos/${selectedTodo.id}`);
    } catch (error) {
      alert(error);
    }
  };

  const addTodo = (titleTodo) => {
    if (!titleTodo) {
      alert("Please Enter Valid Text");
      return;
    }

    const newTodo = {
      title: titleTodo,
      id: Math.floor(Math.random() * 10000),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setFilteredTodos([...filteredTodos, newTodo]);

    saveData(newTodo);
  };

  useEffect(() => {
    const getDate = async () => {
      try {
        const { data } = await http.get("/todos");
        setTodos(data);
        setFilteredTodos(data);
      } catch (error) {
        alert("Error Load Todos");
      }
    };
    getDate();
  }, []);
  const saveData = async (newTodo) => {
    try {
      const res = await http.post("/todos", newTodo);
    } catch (error) {
      alert("Error saving");
    }
  };

  return (
    <Container className="mt-4">
      <Header todos={todos} />
      <TodoForms addTodo={addTodo} filterTodos={filterTodos} />
      <EditHandler
        modalState={modalState}
        editedValue={editedValue}
        setEditedValue={setEditedValue}
        saveEditHandler={saveEditHandler}
        setModalState={setModalState}
      />
      <TodoList
        todos={filteredTodos}
        filteredTodos={filteredTodos}
        modelShowHandler={modelShowHandler}
        saveEditHandler={saveEditHandler}
        deleteHandler={deleteHandler}
        toggleHandler={toggleHandler}
      />
    </Container>
  );
}

export default App;
