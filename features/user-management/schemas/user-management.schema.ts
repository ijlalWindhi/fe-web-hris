import * as z from "zod";

export const CreateUserManagementSchema = z.object({
  user_id: z.string().optional().nullable(),
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .nonempty("Email Address is required")
    .email("Invalid email address"),
  phone_number: z
    .string()
    .nonempty("Phone Number is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters"),
  address: z.string().nonempty("Address is required"),
  role: z.enum(["admin", "super_admin"]),
});
