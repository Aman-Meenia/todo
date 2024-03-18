import { useContext, useState } from "react";
import { TodoContext } from "../store/TodoList";
import toast from "react-hot-toast";
import axios from "axios";

const PATH = import.meta.env.VITE_PATH;

export const useAddTodo = () => {
  const [loading, setLoading] = useState();
  const { todoList, setTodoList } = useContext(TodoContext);

  const addTodo = async ({ name }) => {
    if (!name) {
      return toast.error("Todo name is required");
    }

    name = name.trim();
    if (!name) {
      return toast.error("Name cannot be empty");
    }
    setLoading(true);
    console.log(PATH);
    await axios
      .post(PATH + "/api/todo/add", { name })
      .then((response) => {
        toast.success("Todo added successfully");
        setTodoList([...todoList, response.data.todo], {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { addTodo, loading };
};
