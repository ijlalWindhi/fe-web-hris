import * as z from "zod";

export const ResetPasswordSchema = z.object({
  email: z.string().nonempty("Email Address is required"),
});
