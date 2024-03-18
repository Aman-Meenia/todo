import toast from "react-hot-toast";
import axios from "axios";
import { useContext, useState } from "react";
import { TodoContext } from "../store/TodoList";
const PATH = import.meta.env.VITE_PATH;
export const useGetTodo = () => {
  const [loading, setLoading] = useState(true);
  const { todoList, setTodoList } = useContext(TodoContext);

  const getTodo = async () => {
    setLoading(true);
    await axios
      .get(PATH + "/api/todo/get")
      .then((response) => {
        console.log(response.data.todos);
        setTodoList(response.data.todos);
        toast.success("Todo fetched successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, getTodo };
};
