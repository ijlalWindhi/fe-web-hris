import * as z from "zod";

export const CreateTalentMappingSchema = z.object({
  talent_id: z.string().optional().nullable(),
  name: z.string().nonempty("Name is required"),
  dob: z.string().nonempty("Date of Birth is required"),
  nik: z
    .string()
    .nonempty("ID Number is required")
    .min(16, "Invalid ID Number")
    .max(16, "Invalid ID Number"),
  email: z
    .string()
    .nonempty("Email Address is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .nonempty("Phone Number is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters"),
  address: z.string().nonempty("Address is required"),
  client_id: z.string().nonempty("Client ID is required"),
  client_address: z.string().nonempty("Client Address is required"),
  outlet_id: z.string().nonempty("Outlet ID is required"),
  outlet_address: z.string().nonempty("Outlet Address is required"),
  outlet_lat: z.string().nonempty("Outlet Latitude is required"),
  outlet_long: z.string().nonempty("Outlet Longitude is required"),
  workdays: z
    .number()
    .int()
    .nonnegative("Workdays must be a positive number")
    .min(1, "Workdays must be at least 1"),
});
