import { z } from "zod";

export const adminSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("O e-mail deve ser válido"),
  password: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
});
