// src/validationSchema.ts
import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});
