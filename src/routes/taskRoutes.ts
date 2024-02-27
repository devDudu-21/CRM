import express from "express";

import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
const taskController = new TaskController();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getAllTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, taskController.updateTask);
router.put("/:id/status", authMiddleware, taskController.updateTaskStatus);
router.delete("/:id", authMiddleware, taskController.deleteTask);

export default router;
