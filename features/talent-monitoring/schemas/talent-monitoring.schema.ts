import * as z from "zod";

export const SearchSchema = z.object({
  search: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

export const UpdatePerformanceSchema = z.object({
  note: z.string().nonempty("Notes is required"),
});
