import * as z from "zod";

export const ClaimCompensationSchema = z.object({
  // code_user: z.string().nonempty("Nama TAD wajib diisi"),
  employee: z.array(z.string()).min(1, "Nama TAD wajib diisi"),
  client_id: z.string().nonempty("Nama Klien wajib diisi"),
  service_name: z.string().nonempty("Nama Layanan wajib diisi"),
  amount: z.number().min(1, "Nominal wajib diisi"),
  payment_date: z.string().nonempty("Tanggal Pembayaran wajib diisi"),
  type: z.string().nonempty("Tipe wajib diisi"),
  description: z.string().optional(),
  status_payment: z.string().nonempty("Status Pembayaran wajib diisi"),
});
