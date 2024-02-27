import express from "express";

import { CustomerController } from "../controllers/customerController";
// import sendEmail from "../transporter";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
const customerController = new CustomerController();

router.post("/", authMiddleware, [
  // sendEmail,
  customerController.createCustomer,
]);
router.post("/login", customerController.login);

router.get("/", authMiddleware, customerController.getAllCustomers);
router.get("/:id", authMiddleware, customerController.getCustomerById);
router.put("/:id", authMiddleware, customerController.updateCustomer);
router.delete("/:id", authMiddleware, customerController.deleteCustomer);

export default router;
