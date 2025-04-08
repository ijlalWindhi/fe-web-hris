import * as z from "zod";

const passwordRequirements = {
  minLength: 8,
  requireLetters: true,
  requireNumbers: true,
  requireSymbols: true,
};

export const FirstLoginSchema = z
  .object({
    email: z.string().email().nonempty("Email is required"),
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
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
