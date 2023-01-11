import Todo from "./Todo";
const TodoList = ({ deleteHandler, toggleHandler, saveEditHandler , modelShowHandler , filteredTodos}) => {
  return (
    <>
      {filteredTodos?.length !== 0 &&
        filteredTodos.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            modelShowHandler={modelShowHandler}
            saveEditHandler={saveEditHandler}
            deleteHandler={deleteHandler}
            toggleHandler={toggleHandler}
          />
        ))}
    </>
  );
};

export default TodoList;
