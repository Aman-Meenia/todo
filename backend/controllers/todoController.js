import Todo from "../model/todoModel.js";
import mongoose from "mongoose";

// <-----------------------------Add Todo ---------------------------->

export const addTodo = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Todo name is required",
      });
    }

    const newName = name.trim();

    if (!newName) {
      return res.status(400).json({
        status: false,
        message: "Name cannot be empty",
      });
    }

    const todo = await Todo.findOne({ name: newName });
    if (todo) {
      return res.status(400).json({
        status: false,
        message: "Todo already exists",
      });
    }

    const newTodo = new Todo({ name });
    await newTodo.save();

    return res.status(200).json({
      status: true,
      message: "new todo added successfully",
      todo: newTodo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <-----------------------------Get Todo ---------------------------->

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      status: true,
      todos,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//<-----------------------------Update Todo ---------------------------->

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Todo name is required",
      });
    }

    const newName = name.trim();

    if (!newName) {
      return res.status(400).json({
        status: false,
        message: "Name cannot be empty",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    todo.name = newName;
    await todo.save();
    return res.status(200).json({
      status: true,
      message: "Todo updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//<-----------------------------Delete Todo ---------------------------->

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    await Todo.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// <--------------------------Complete Todo ----------------------------->

export const completeTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }
    if (todo.completed === true) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }

    await todo.save();
    return res.status(200).json({
      status: true,
      message: todo.completed
        ? "Todo completed successfully"
        : "Todo Uncompleted ",
      completed: todo.completed,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
