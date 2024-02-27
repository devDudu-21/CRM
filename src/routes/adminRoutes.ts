import express from "express";

import { AdminController } from "../controllers/adminController";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

const adminController = new AdminController();

router.post("/create", adminMiddleware, adminController.createAdmin);
router.post("/login", adminController.login);
router.get("/me", adminMiddleware, adminController.loadAdminById);

export default router;
