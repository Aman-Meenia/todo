import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TodoContextProvider from "./store/TodoList.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoContextProvider>
    <Toaster />
    <App />
  </TodoContextProvider>,
);
