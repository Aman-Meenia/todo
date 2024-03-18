import express from "express";
import {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/get", getTodo);
router.post("/add", addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.patch("/status/:id", completeTodo);

export default router;
