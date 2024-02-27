import { NextFunction, Request, Response } from "express";

import "dotenv/config";
import jwt from "jsonwebtoken";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwtSecret = process.env.JWT_SECRET;
  // Verifica se o cabeçalho 'Authorization' está presente na requisição
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    // Se não estiver presente, retorna um erro de "Token not found"
    return res.status(401).json({ message: "Token not found" });
  }

  // Extrai o token da string "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    // Se não houver um token, retorna um erro de "Token not found"
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    if (!jwtSecret) {
      console.log("Não foi possível validar o token, verifique as credenciais");
      return null;
    }
    const decodedToken = jwt.verify(token, jwtSecret) as { role: string };
    if (decodedToken.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }
    next();
    return decodedToken.role;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
