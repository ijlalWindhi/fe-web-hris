import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { InputCurrency } from "@/components/common/input-currency";

import { CreateMasterClientSchema } from "../schemas/master-client.schema";

type TClientInformationProps = {
  form: UseFormReturn<z.infer<typeof CreateMasterClientSchema>>;
};

export default function ClientInformation({
  form,
}: Readonly<TClientInformationProps>) {
  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="basic_salary"
        label="Basic Salary"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCurrency
            placeholder="e.g. 1.000.000"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
          />
        )}
      />
      <InputField
        name="agency_fee"
        label="Agency Fee"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCurrency
            placeholder="e.g. 1.000.000"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
          />
        )}
      />
    </div>
  );
}
