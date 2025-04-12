import * as z from "zod";

export const MasterDataSchema = z.object({
  date: z.string().nonempty("Date is required"),
  month: z.string().nonempty("Month is required"),
  notes: z.string().nonempty("Notes is required"),
});
