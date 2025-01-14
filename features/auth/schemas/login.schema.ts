import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().nonempty("Email Address is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});
