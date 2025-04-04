import * as z from "zod";

export const SearchSchema = z.object({
  search: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});
