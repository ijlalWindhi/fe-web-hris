import * as z from "zod";

export const DownloadReportSchema = z.object({
  filters: z
    .array(
      z.object({
        item_seen: z.string().min(1, "Item is required"),
        operator: z.enum(["AND", "OR"]).default("AND"),
      }),
    )
    .min(1, "At least one filter is required"),
});

export const CreateMasterClientSchema = z.object({
  name: z.string().nonempty("Client name is required"),
  address: z.string().nonempty("Client address is required"),
  npwp: z.string().nonempty("NPWP is required"),
  brand_name: z.string().nonempty("Brand name is required"),
  cs_person: z.string().nonempty("CS Person is required"),
  cs_number: z
    .string()
    .nonempty("CS Number is required")
    .min(10, "CS Number must be at least 10 characters")
    .max(15, "CS Number must be at most 15 characters"),
  cs_email: z
    .string()
    .nonempty("CS Email is required")
    .email("Invalid CS Email"),
  start_contract: z.string().nonempty("Start Contract Date is required"),
  end_contract: z.string().nonempty("End Contract Date is required"),
  outlet: z
    .array(
      z.object({
        id_outlet: z.string().optional(),
        name: z.string().nonempty("Outlet name is required"),
        address: z.string().nonempty("Outlet address is required"),
        longitude: z.string().nonempty("Outlet longitude is required"),
        latitude: z.string().nonempty("Outlet latitude is required"),
      }),
    )
    .min(1, "At least one outlet is required"),
  basic_salary: z.number().min(1, "Basic Salary is required"),
  agency_fee: z.number().min(1, "Agency Fee is required"),
  payment_day: z.number().min(1, "Payment Day is required"),
  bpjs: z.array(
    z.object({
      name: z.string().nonempty("BPJS Deduction Name is required"),
      amount: z.number().min(0, "BPJS Deduction Amount is required"),
    }),
  ),
  // .min(1, "At least one BPJS Deduction is required"),
  allowences: z.array(
    z.object({
      name: z.string().nonempty("Allowence Name is required"),
      amount: z.number().min(0, "Allowence Amount is required"),
      is_daily: z.string().nonempty("Type is required"),
    }),
  ),
  // .min(1, "At least one Allowence is required"),
  payment_date: z.string().nonempty("Payment Due Date is required"),
});

export const CreateMasterClientOutletSchema = z.object({
  name: z.string().nonempty("Outlet name is required"),
  address: z.string().nonempty("Outlet address is required"),
  long: z.string().nonempty("Outlet longitude is required"),
  lat: z.string().nonempty("Outlet latitude is required"),
});

export const UploadSignatureSchema = z.object({
  manager: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    }),
  technical: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    }),
  role1: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    }),
  role2: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    }),
  role3: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    }),
});
