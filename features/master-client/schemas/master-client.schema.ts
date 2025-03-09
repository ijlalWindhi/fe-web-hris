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
  basic_salary: z
    .string()
    .min(1, "Basic Salary is required")
    .regex(/^\d+$/, "Basic Salary must be a number"),
  agency_fee: z
    .string()
    .min(1, "Agency Fee is required")
    .regex(/^\d+$/, "Agency Fee must be a number"),
  outlet: z
    .array(
      z.object({
        outlet_id: z.string().nullable().optional(),
        name: z.string().nonempty("Outlet name is required"),
        address: z.string().nonempty("Outlet address is required"),
        long: z.string().nonempty("Outlet longitude is required"),
        lat: z.string().nonempty("Outlet latitude is required"),
      }),
    )
    .min(1, "At least one outlet is required"),
  payroll_basic_salary: z
    .string()
    .min(1, "Payroll Basic Salary is required")
    .regex(/^\d+$/, "Payroll Basic Salary must be a number"),
  payroll_agency_fee: z
    .string()
    .min(1, "Payroll Agency Fee is required")
    .regex(/^\d+$/, "Payroll Agency Fee must be a number"),
  bpjs_deduction: z
    .array(
      z.object({
        type: z.string().nonempty("BPJS Deduction Type is required"),
        amount: z
          .string()
          .nonempty("BPJS Deduction Amount is required")
          .regex(/^\d+$/, "BPJS Deduction Amount must be a number"),
      }),
    )
    .min(1, "At least one BPJS Deduction is required"),
  payment_due_date: z.string().nonempty("Payment Due Date is required"),
});
