import { useContext, useState } from "react";
import { TodoContext } from "../store/TodoList";
import toast from "react-hot-toast";
import axios from "axios";
const PATH = import.meta.env.VITE_PATH;
export const useCompleteTodo = () => {
  const [completeLoading, setLoading] = useState(false);
  const { todoList, setTodoList } = useContext(TodoContext);

  const completeTodo = async ({ id }) => {
    setLoading(true);
    await axios
      .patch(PATH + `api/todo/status/${id}`)
      .then((response) => {
        const newTodo = todoList.map((todo) => {
          if (todo._id === id) {
            todo.completed = response.data.completed;
          }
          return todo;
        });
        setTodoList(newTodo);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Something went wrong");
      });
  };
  return { completeLoading, completeTodo };
};
