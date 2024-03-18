import React, { useContext, useEffect } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import { TodoContext } from "../store/TodoList";
import { useGetTodo } from "../hooks/useGetTodo";

const Todos = () => {
  const { todoList, setTodoLsit } = useContext(TodoContext);
  const { loading, getTodo } = useGetTodo();
  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
          <AddTodo />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todoList &&
            todoList.length > 0 &&
            todoList.map((todo) => {
              return <Todo key={todo._id} todo={todo} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Todos;
