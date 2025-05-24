import { z } from "zod";

export const schemaParams = z.object({
  fecha1: z.string().optional().default(''),
  fecha2: z.string().optional().default(''),
  empresa: z.string().min(3).max(16)
})