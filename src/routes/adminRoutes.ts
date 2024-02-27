import express from "express";

import { AdminController } from "../controllers/adminController";

const router = express.Router();

const adminController = new AdminController();

router.post("/login", adminController.login);

export default router;
