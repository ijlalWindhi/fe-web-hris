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
  client_name: z.string().nonempty("Client Name is required"),
  client_id: z.string().optional().nullable(),
  client_address: z.string().optional().nullable(),
  outlet_mapping: z.string().nonempty("Outlet Mapping is required"),
  outlet_id: z.string().optional().nullable(),
  outlet_address: z.string().optional().nullable(),
  outlet_lat: z.string().optional().nullable(),
  outlet_long: z.string().optional().nullable(),
  contract_start_date: z.string().nonempty("Contract Start Date is required"),
  contract_end_date: z.string().nonempty("Contract End Date is required"),
});

export const WorkingArrangementSchema = z.object({
  total_working_days: z.number().optional().nullable(),
  working_arrangements: z.array(
    z.object({
      shift_id: z.string().optional().nullable(),
      day: z.string().nonempty("Day is required"),
      start_time: z.string().nonempty("Start Time is required"),
      end_time: z.string().nonempty("End Time is required"),
    }),
  ),
});
