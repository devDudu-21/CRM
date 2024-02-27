import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/token";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    // Valida o token
    const decodedToken = validateToken(token);
    if (!decodedToken) {
      // Se o token não for válido, retorna um erro de "Invalid token"
      return res.status(401).json({ message: "Invalid token" });
    }

    // Define um objeto com funções para manipular o email com base no tipo de token
    const tokenTypeHandlers = {
      adminId: () => decodedToken.email, // Função para token de administrador
      customerId: () => decodedToken.email, // Função para token de cliente
    };

    // Obtém o tipo de token (adminId ou customerId)
    const tokenType = Object.keys(
      decodedToken
    )[0] as keyof typeof tokenTypeHandlers;

    // Usa o tipo de token para obter o email correto usando o objeto de manipuladores de tipo
    const email = tokenTypeHandlers[tokenType]();

    if (!email) {
      // Se o email não for encontrado, retorna um erro de "Invalid token"
      return res.status(401).json({ message: "Invalid token" });
    }

    // Continua para o próximo middleware ou rota
    next();
  } catch (error) {
    // Se ocorrer um erro ao decodificar o token, retorna um erro de "Invalid token"
    return res.status(401).json({ message: "Invalid token" });
  }
}
