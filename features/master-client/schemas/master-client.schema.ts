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
  outlet: z
    .array(
      z.object({
        name: z.string().nonempty("Outlet name is required"),
        address: z.string().nonempty("Outlet address is required"),
        longitude: z.string().nonempty("Outlet longitude is required"),
        latitude: z.string().nonempty("Outlet latitude is required"),
      }),
    )
    .min(1, "At least one outlet is required"),
  basic_salary: z.number().min(1, "Basic Salary is required"),
  agency_fee: z.number().min(1, "Agency Fee is required"),
  bpjs: z
    .array(
      z.object({
        name: z.string().nonempty("BPJS Deduction Name is required"),
        amount: z.number().min(1, "BPJS Deduction Amount is required"),
      }),
    )
    .min(1, "At least one BPJS Deduction is required"),
  allowences: z
    .array(
      z.object({
        name: z.string().nonempty("Allowence Name is required"),
        amount: z.number().min(1, "Allowence Amount is required"),
      }),
    )
    .min(1, "At least one Allowence is required"),
  payment_date: z.string().nonempty("Payment Due Date is required"),
});

export const CreateMasterClientOutletSchema = z.object({
  name: z.string().nonempty("Outlet name is required"),
  address: z.string().nonempty("Outlet address is required"),
  long: z.string().nonempty("Outlet longitude is required"),
  lat: z.string().nonempty("Outlet latitude is required"),
});
