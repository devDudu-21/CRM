import express from "express";

import { AdminController } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

const adminController = new AdminController();

router.post("/login", adminController.login);
router.get("/me", authMiddleware, adminController.loadAdminById);

export default router;
