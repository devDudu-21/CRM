import { Request, Response } from "express";
import { adminRepository } from "../repositories/adminRepository";
import { generateToken } from "../utils/token";
import { checkPassword } from "../utils/hash";

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
        const token = generateToken({ adminId: admin.id, email: admin.email });
        res.json({ token: token });
      } else {
        res.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ error: error });
    }
  }
}
