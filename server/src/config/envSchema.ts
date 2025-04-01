import { z } from "zod";

const envSchema = z.object({
  DB_POWERBI_HOST: z.string().min(2, "Host - Url de base de datos es requerido"),
  DB_POWERBI_PORT: z.string().transform((v) => parseInt(v, 10)),
  DB_POWERBI_USER: z.string().min(2, "Usuario base de datos requerido"),
  DB_POWERBI_PASS: z.string().min(2, "Password base de datos requerido"),
  DB_POWERBI_DATABASE: z.string().min(2, "Name Database requerido")
})

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error(error.format());
  process.exit(1);
}

export const {
  DB_POWERBI_DATABASE,
  DB_POWERBI_HOST,
  DB_POWERBI_PASS,
  DB_POWERBI_PORT,
  DB_POWERBI_USER
} = data