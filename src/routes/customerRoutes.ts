import express from "express";
import { CustomerController } from "../controllers/customerController";
import sendEmail from "../transporter";
const router = express.Router();
const customerController = new CustomerController();

router.post("/", [sendEmail, customerController.createCustomer]);
router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;
