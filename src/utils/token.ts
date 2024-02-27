import jwt, { Secret } from "jsonwebtoken";

const jwtSecret: Secret | undefined = process.env.JWT_SECRET;

export interface AdminJwtPayload {
  adminId: number;
  email: string;
}

export interface CustomerJwtPayload {
  customerId: number;
  email: string;
}

export function generateToken(
  payload: AdminJwtPayload | CustomerJwtPayload
): string | undefined {
  if (!jwtSecret) {
    console.log("Não foi possível gerar o token, verifique as credenciais");
    return undefined;
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

export function validateToken(
  token: string
): AdminJwtPayload | CustomerJwtPayload | null {
  try {
    if (!jwtSecret) {
      console.log("Não foi possível validar o token, verifique as credenciais");
      return null;
    }
    return jwt.verify(token, jwtSecret) as AdminJwtPayload | CustomerJwtPayload;
  } catch (error) {
    return null;
  }
}
