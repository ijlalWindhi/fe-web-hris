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
