import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});
