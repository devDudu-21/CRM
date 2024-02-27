import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  status: z.enum(["pending", "in-progress", "completed"]),
  createdAt: z.date(),
  finishedAt: z.date().nullable(),
  adminId: z.string().nullable(),
});
