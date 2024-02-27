import express from "express";
import { CustomerController } from "../controllers/customerController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
const customerController = new CustomerController();

// Rota para criar um novo cliente
router.post("/", authMiddleware, customerController.createCustomer);

// Rota para autenticar o login do cliente
router.post("/login", customerController.login);

// Rota para obter todos os clientes
router.get("/", authMiddleware, customerController.getAllCustomers);

// Rota para obter um cliente pelo ID
router.get("/:id", authMiddleware, customerController.getCustomerById);

// Rota para encontrar um cliente pelo email
router.get("/find", authMiddleware, customerController.getCustomerByEmail);

// Rota para atualizar os dados de um cliente
router.put("/:id", authMiddleware, customerController.updateCustomer);

// Rota para excluir um cliente
router.delete("/:id", authMiddleware, customerController.deleteCustomer);

export default router;
