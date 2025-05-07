import * as z from "zod";

export const createTalentMappingSchema = (roleId: number) => {
  const baseSchema = z.object({
    talent_id: z.string().optional().nullable(),
    name: z.string().nonempty("Nama wajib diisi"),
    dob: z.string().nonempty("Tanggal Lahir wajib diisi"),
    tempat_lahir: z.string().optional().nullable(),
    kk: z.string().nonempty("Kartu Keluarga wajib diisi"),
    nik: z
      .string()
      .nonempty("NIK wajib diisi")
      .min(16, "NIK tidak sesuai")
      .max(16, "NIK tidak sesuai"),
    email: z.string().nonempty("Email wajib diisi").email("Email tidak sesuai"),
    phone: z
      .string()
      .nonempty("Nomor Telepon wajib diisi")
      .min(10, "Nomor Telepon harus minimal 10 karakter")
      .max(15, "Nomor Telepon harus maksimal 15 karakter"),
    address: z.string().nonempty("Alamat wajib diisi"),
    bpjs_number: z.string().optional().nullable(),
    bank_account_name: z.string().optional().nullable(),
    bank_account_number: z.string().optional().nullable(),
    ptkp: z.string().nonempty("PTKP wajib diisi"),
    npwp: z.string().optional().nullable(),
    type_tad: z.string().nonempty("Tipe TAD wajib diisi"),
    gender: z.string().nonempty("Jenis Kelamin wajib diisi"),
    role_id: z.string().nonempty("Role Pengguna wajib diisi"),
    client_name: z.string().optional().nullable(),
    client_id: z.string().optional().nullable(),
    client_address: z.string().optional().nullable(),
    outlet_mapping: z.string().optional().nullable(),
    outlet_id: z.string().optional().nullable(),
    outlet_address: z.string().optional().nullable(),
    outlet_lat: z.string().optional().nullable(),
    outlet_long: z.string().optional().nullable(),
    total_working_days: z.number().optional().nullable(),
    working_arrangements: z.array(
      z.object({
        shift_id: z.string().optional().nullable(),
        day: z.string().nonempty("Hari wajib diisi"),
        start_time: z.string().nonempty("Waktu Mulai wajib diisi"),
        end_time: z.string().nonempty("Waktu Selesai wajib diisi"),
      }),
    ),
  });

  const schemaWithContract =
    roleId === 2
      ? baseSchema.extend({
          contract_start_date: z
            .string()
            .nonempty("Tanggal Mulai Kontrak wajib diisi"),
          contract_end_date: z
            .string()
            .nonempty("Tanggal Akhir Kontrak wajib diisi"),
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
          message: "Outlet Mapping wajib diisi ketika Nama Klien disediakan",
          path: ["outlet_mapping"],
        });
      }
    }

    // Validate NPWP when provided: must match NIK and max 16 characters
    if (data.npwp && data.npwp.trim() !== "") {
      if (data.npwp !== data.nik) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NPWP harus sama dengan Nomor Identitas (NIK)",
          path: ["npwp"],
        });
      }

      if (data.npwp.length > 16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NPWP harus maksimal 16 karakter",
          path: ["npwp"],
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
      day: z.string().nonempty("Hari wajib diisi"),
      start_time: z.string().nonempty("Waktu Mulai wajib diisi"),
      end_time: z.string().nonempty("Waktu Selesai wajib diisi"),
    }),
  ),
});

export const SearchWorkingArrangementSchema = z.object({
  client_id: z.string().nonempty(),
  outlet_id: z.string().nonempty(),
  start_date: z.string().nonempty(),
  end_date: z.string().nonempty(),
});
