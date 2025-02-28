import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import InputNumber from "@/components/common/input-number";

import { CreateTalentMappingSchema } from "../schemas/talent-mapping.schema";

type TWorkingArrangmentProps = {
  form: UseFormReturn<z.infer<typeof CreateTalentMappingSchema>>;
};

export default function WorkingArrangement({
  form,
}: Readonly<TWorkingArrangmentProps>) {
  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="shift_id"
        label="Shift ID"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="e.g. 123456" {...field} />
        )}
      />
      <InputField
        name="workdays"
        label="Workdays"
        primary
        control={form.control}
        render={({ field }) => <InputNumber placeholder="e.g. 1" {...field} />}
      />
      <div className="flex items-end justify-between gap-4">
        <div className="w-full">
          <InputField
            name="start_time"
            label="Set Time"
            primary
            control={form.control}
            render={({ field }) => (
              <Input type="time" placeholder="e.g. 08:00" {...field} />
            )}
          />
        </div>
        <p className="h-8">-</p>
        <div className="w-full">
          <InputField
            name="end_time"
            primary
            control={form.control}
            render={({ field }) => (
              <Input type="time" placeholder="e.g. 17:00" {...field} />
            )}
          />
        </div>
      </div>
    </div>
  );
}
