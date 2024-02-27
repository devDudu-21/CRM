import jwt, { Secret } from "jsonwebtoken";

const jwtSecret: Secret | undefined = process.env.JWT_SECRET;

interface JwtPayload {
  adminId: number;
  email: string;
}

export function generateToken(payload: JwtPayload): string | undefined {
  if (!jwtSecret) {
    console.log("Não foi possível gerar o token, verifique as credenciais");
    return undefined;
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

export function validateToken(token: string): JwtPayload | null {
  try {
    if (!jwtSecret) {
      console.log("Não foi possível validar o token, verifique as credenciais");
      return null;
    }
    return jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (error) {
    return null;
  }
}
