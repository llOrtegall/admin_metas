import { z } from "zod";

const envSchema = z.object({
  DB_ORACLE_HOST: z.string().min(2, "Host - Url de base de datos es requerido"),
  DB_ORACLE_PORT: z.string().transform((v) => parseInt(v, 10)),
  DB_ORACLE_USER: z.string().min(2, "Usuario base de datos requerido"),
  DB_ORACLE_PASS: z.string().min(2, "Password base de datos requerido"),
  DB_ORACLE_DATABASE: z.string().min(2, "Name Database requerido"),
  DB_ORACLE_LIB_DIR: z.string().min(2, "Libreria base de datos requerida")
})

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error(error.format());
  process.exit(1);
}

export const {
  DB_ORACLE_DATABASE,
  DB_ORACLE_HOST,
  DB_ORACLE_PASS,
  DB_ORACLE_PORT,
  DB_ORACLE_USER,
  DB_ORACLE_LIB_DIR
} = data