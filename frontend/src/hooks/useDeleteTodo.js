import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { TodoContext } from "../store/TodoList";
const PATH = import.meta.env.VITE_PATH;
export const useDeleteTodo = () => {
  const [loading, setLoading] = useState();
  const { todoList, setTodoList } = useContext(TodoContext);

  const deleteTodo = async ({ id }) => {
    setLoading(true);
    await axios
      .delete(PATH + `/api/todo/delete/${id}`)
      .then((response) => {
        toast.success("Todo deleted successfully");
        setTodoList(
          todoList.filter((todo) => {
            return todo._id !== id;
          }),
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, deleteTodo };
};
