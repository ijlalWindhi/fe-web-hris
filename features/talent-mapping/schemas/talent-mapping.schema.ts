import * as z from "zod";

export const createTalentMappingSchema = (roleId: number) => {
  const baseSchema = z.object({
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
    bpjs_number: z.string().nonempty("BPJS Number is required"),
    bank_account_name: z.string().optional().nullable(),
    bank_account_number: z.string().optional().nullable(),
    ptkp: z.string().nonempty("PTKP is required"),
    npwp: z.string().nonempty("NPWP is required"),
    type_tad: z.string().nonempty("Type TAD is required"),
    gender: z.string().nonempty("Gender is required"),
    client_name: z.string().optional().nullable(),
    client_id: z.string().optional().nullable(),
    client_address: z.string().optional().nullable(),
    outlet_mapping: z.string().optional().nullable(),
    outlet_id: z.string().optional().nullable(),
    outlet_address: z.string().optional().nullable(),
    outlet_lat: z.string().optional().nullable(),
    outlet_long: z.string().optional().nullable(),
  });

  const schemaWithContract =
    roleId === 2
      ? baseSchema.extend({
          contract_start_date: z
            .string()
            .nonempty("Contract Start Date is required"),
          contract_end_date: z
            .string()
            .nonempty("Contract End Date is required"),
          current_salary: z.number().optional(),
          resign_date: z.string().optional(),
        })
      : baseSchema.extend({
          contract_start_date: z.string().optional(),
          contract_end_date: z.string().optional(),
          current_salary: z.number().optional(),
          resign_date: z.string().optional(),
        });

  return schemaWithContract.superRefine((data, ctx) => {
    if (data.client_name && data.client_name.trim() !== "") {
      if (!data.outlet_mapping || data.outlet_mapping.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Outlet Mapping is required when Client Name is provided",
          path: ["outlet_mapping"],
        });
      }
    }
  });
};

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

export const SearchWorkingArrangementSchema = z.object({
  client_id: z.string().nonempty(),
  outlet_id: z.string().nonempty(),
  start_date: z.string().nonempty(),
  end_date: z.string().nonempty(),
});
