import { useState } from "react";
import { useAddTodo } from "../hooks/useAddTodo";

function AddTodo() {
  const { addTodo, loading } = useAddTodo();

  const [name, setName] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodo({ name });
    setName("");
  };

  return (
    <form className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleAddTodo}
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        {loading ? <span className="loading spinner-loading"></span> : "Add"}
      </button>
    </form>
  );
}

export default AddTodo;
