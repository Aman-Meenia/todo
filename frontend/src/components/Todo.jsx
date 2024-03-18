import { useContext, useState } from "react";
import { TodoContext } from "../store/TodoList";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useCompleteTodo } from "../hooks/useCompleteTodo";

function Todo({ todo }) {
  const isTodoEditable = true;
  const { deleteTodo, loading } = useDeleteTodo();
  const handleDeleteTodo = async (e) => {
    e.preventDefault();
    deleteTodo({ id: todo._id });
  };

  const { completeLoading, completeTodo } = useCompleteTodo();
  const handleCompleteTodo = async (e) => {
    e.preventDefault();
    completeTodo({ id: todo._id });
  };

  const [todoCheck, setTodoCheck] = useState("");

  return (
    <>
      <div
        className="flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50
        duration-300  text-black w-full"
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          onClick={handleCompleteTodo}
          // defaultChecked={todo?.completed}
          onChange={(e) => setTodoCheck(todo?.completed)}
          checked={todo?.completed}
        />

        <input
          type="text"
          className="border outline-none w-full bg-transparent rounded-lg text-white p-1 "
          value={todo?.name}
          disabled={!isTodoEditable}
          readOnly
        />

        <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50">
          {todo.completed ? "✅" : "✏️"}
        </button>

        <button
          onClick={handleDeleteTodo}
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        >
          {loading ? "⏳" : "❌"}
        </button>
      </div>
    </>
  );
}

export default Todo;
