import * as z from "zod";

export const TypeTadSchema = z.object({
  id_client: z.string().nonempty("ID Client is required"),
  type_tad: z.string().nonempty("Type TAD is required"),
  type_employee: z.string().nonempty("Type Employee is required"),
  positional_allowance: z.number().min(1, "Positional Allowance is required"),
});
