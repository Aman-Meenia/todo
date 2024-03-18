import React from "react";

export const TodoContext = React.createContext();

const TodoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = React.useState([]);
  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
