import express from "express";
import { TaskController } from "../controllers/taskController";

const router = express.Router();
const taskController = new TaskController();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.put("/:id/status", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

export default router;
