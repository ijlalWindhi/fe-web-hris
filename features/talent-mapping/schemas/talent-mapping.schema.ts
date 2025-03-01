import * as z from "zod";

export const CreateTalentMappingSchema = z.object({
  talent_id: z.string().optional().nullable(),
  workdays: z.string().nonempty("Workdays is required"),
  date_of_birth: z.string().nonempty("Date of Birth is required"),
  id_number: z.string().nonempty("ID Number is required"),
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
  client_name: z.string().nonempty("Client Name is required"),
  client_id: z.string().nonempty("Client ID is required"),
  client_address: z.string().nonempty("Client Address is required"),
  outlet_mapping: z.string().nonempty("Outlet Mapping is required"),
  outlet_id: z.string().nonempty("Outlet ID is required"),
  outlet_address: z.string().nonempty("Outlet Address is required"),
  shift_id: z.string().nonempty("Shift ID is required"),
  start_time: z.string().nonempty("Start Time is required"),
  end_time: z
    .string()
    .nonempty("End Time is required")
    .refine(
      (value) => {
        console.log(value);
        const startTime = new Date(value);
        const endTime = new Date(value);
        return endTime > startTime;
      },
      {
        message: "End Time must be greater than Start Time",
      },
    ),
});
