import { z } from "zod";

const isValidCNPJ = (cnpj: string): boolean => {
  const cnpjWithoutSpecialCharacters = cnpj.replace(/[^\d]+/g, "");
  const digits = cnpjWithoutSpecialCharacters.split("").map(Number);
  let sum = 0;
  let factor = 5;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (digits[12] !== digit) return false;

  sum = 0;
  factor = 6;
  for (let i = 0; i < 13; i++) {
    sum += digits[i] * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (digits[13] !== digit) return false;

  return true;
};

export const customerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("O e-mail deve ser válido"),
  cnpj: z
    .string()
    .min(14, "CNPJ inválido")
    .max(18, "CNPJ inválido")
    .regex(/^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/)
    .refine((cnpj) => isValidCNPJ(cnpj), {
      message: "CNPJ inválido",
    }),
  razaoSocial: z.string(),
  address: z.object({
    rua: z.string(),
    numero: z.string(),
    cidade: z.string(),
    estado: z.string(),
    codigoPostal: z.string().refine(
      (codigoPostal) => {
        const cepRegex = /^(?:\d{5}-\d{3}|\d{8})$/;
        return cepRegex.test(codigoPostal);
      },
      { message: "Código postal inválido" }
    ),
  }),
  telefone: z.string().refine(
    (telefone) => {
      const phoneRegex =
        /^(?:\(\d{2}\)\s?\d{4,5}-?\d{4}|\d{2}\s?\d{4,5}-?\d{4})$/;
      return phoneRegex.test(telefone);
    },
    { message: "Número de telefone inválido" }
  ),
});
