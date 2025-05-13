import { z } from "zod";

export const schemaParams = z.object({
  fecha: z.string().optional().default(''),
  empresa: z.string().min(3).max(16)
})