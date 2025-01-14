import * as z from "zod";

const passwordRequirements = {
  minLength: 8,
  requireLetters: true,
  requireNumbers: true,
  requireSymbols: true,
};

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(
        passwordRequirements.minLength,
        `Password must be at least ${passwordRequirements.minLength} characters`,
      )
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
    repeat_password: z.string().nonempty("Repeat password is required"),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["repeat_password"],
  });
