import * as z from "zod";

export const ClaimCompensationSchema = z.object({
  code_user: z.string().nonempty("TAD Name is required"),
  client_id: z.string().nonempty("Client Name is required"),
  service_name: z.string().nonempty("Service Name is required"),
  amount: z.number().min(1, "Nominal is required"),
  payment_date: z.string().nonempty("Payment Date is required"),
  type: z.string().nonempty("Type is required"),
  description: z.string().optional(),
});
