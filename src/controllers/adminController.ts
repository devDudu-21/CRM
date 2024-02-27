import { Request, Response } from "express";
import { adminRepository } from "../repositories/adminRepository";
import { generateToken } from "../utils/token";
import { checkPassword, generateHash } from "../utils/hash";
import { adminSchema } from "../validators/adminValidator";

export class AdminController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const admin = await adminRepository.findOneBy({
        email: email,
      });
      if (!admin) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }
      const isPasswordValid = await checkPassword(password, admin.password);

      if (isPasswordValid) {
        const token = generateToken({
          adminId: admin.id,
          email: admin.email,
          role: "admin",
        });
        res.json({ token: token });
      } else {
        res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: error });
    }
  }

  async loadAdminById(req: Request, res: Response) {
    try {
      const adminId = req.body.adminId;
      const admin = await adminRepository.findOneBy({ id: adminId });
      if (!admin) {
        res.status(404).json({ message: "Admin não encontrado" });
        return;
      }

      res.json({ id: adminId, email: admin.email, name: admin.name });
    } catch (error) {
      console.error("Erro ao carregar admin:", error);
      res.status(500).json({ error: error });
    }
  }

  async createAdmin(req: Request, res: Response) {
    try {
      const validatedData = adminSchema.parse(req.body);
      const hashedPassword = await generateHash(validatedData.password);

      const newAdmin = adminRepository.create({
        ...validatedData,
        password: hashedPassword,
        role: "admin",
      });
      await adminRepository.save(newAdmin);
      res.status(201).json(newAdmin);
    } catch (error) {
      console.error("Erro ao criar administrador:", error);
      res.status(500).json({ error: error });
    }
  }
}
