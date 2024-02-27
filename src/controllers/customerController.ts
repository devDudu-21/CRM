import "dotenv/config";

import { Request, Response } from "express";
import { customerSchema } from "../validators/customerValidator";
import { customerRepository } from "../repositories/customerRepository";
import { generateHash, checkPassword } from "../utils/hash";
import { generateToken } from "../utils/token";

export class CustomerController {
  async createCustomer(req: Request, res: Response) {
    try {
      const validatedData = customerSchema.parse(req.body);
      const hashedPassword = await generateHash(validatedData.password);

      const newCustomer = customerRepository.create({
        ...validatedData,
        password: hashedPassword,
      });
      await customerRepository.save(newCustomer);
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getAllCustomers(req: Request, res: Response) {
    try {
      const customers = await customerRepository.find();
      res.json(customers);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ error: error });
    }
  }
  async getCustomerById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const customer = await customerRepository.findOneBy({ id: id });
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ message: "Cliente não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      res.status(500).json({ error: error });
    }
  }
  async getCustomerByEmail(req: Request, res: Response) {
    try {
      const email = req.query.email as string; // Extrai o email dos parâmetros de consulta
      const customer = await customerRepository.findOneBy({ email: email }); // Busca o cliente pelo email
      if (!customer) {
        res.status(404).json({ message: "Cliente não encontrado" });
      } else {
        res.json(customer);
      }
    } catch (error) {
      console.error("Erro ao buscar cliente pelo email:", error);
      res.status(500).json({ error: error });
    }
  }
  async updateCustomer(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const dataToUpdate = customerSchema.parse(req.body);
      const updatedCustomer = await customerRepository.save({
        id: id,
        ...dataToUpdate,
      });
      res.json(updatedCustomer);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      res.status(400).json({ error: error });
    }
  }
  async deleteCustomer(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await customerRepository.delete(id);
      res.status(200).json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      res.status(500).json({ error: error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const customer = await customerRepository.findOneBy({
        email: email,
      });
      if (!customer) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }
      const isPasswordValid = await checkPassword(password, customer.password);

      if (isPasswordValid) {
        const token = generateToken({
          customerId: customer.id,
          email: customer.email,
        });
        res.json({ token: token });
      } else {
        res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      res.status(500).json({ error: error });
    }
  }
}
