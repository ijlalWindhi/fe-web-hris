import React from "react";
import { MinusCircle, Plus } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { InputCurrency } from "@/components/common/input-currency";
import { DatePicker } from "@/components/common/input-date-picket";
import { Label } from "@/components/ui/label";

import { CreateMasterClientSchema } from "../schemas/master-client.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TPayrollProps = {
  form: UseFormReturn<z.infer<typeof CreateMasterClientSchema>>;
};

export default function Payroll({ form }: Readonly<TPayrollProps>) {
  // variables
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bpjs_deduction",
  });

  // functions
  const handleAddField = () => {
    append({ type: "", amount: "" });
  };

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="payroll_basic_salary"
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
        name="payroll_agency_fee"
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
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <Label>BPJS Deduction</Label>
          <div
            className="flex gap-2 items-center w-fit text-primary text-sm cursor-pointer"
            onClick={handleAddField}
          >
            <Plus size={16} />
            <p>Tambah Data</p>
          </div>
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex w-full justify-between items-end gap-2 flex-col md:flex-row">
              <InputField
                name={`bpjs_deduction.${index}.type`}
                control={form.control}
                className="w-full"
                render={({ field }) => (
                  <Input {...field} placeholder="e.g. BPJS Health Deduction" />
                )}
              />
              <div className="w-full">
                <InputField
                  name={`bpjs_deduction.${index}.amount`}
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
              <Button
                type="button"
                variant={"outline"}
                size="icon"
                className="w-full md:w-20"
                onClick={() => remove(index)}
              >
                <MinusCircle size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <InputField
        name="payment_due_date"
        label="Payment Due Date"
        primary
        control={form.control}
        render={({ field }) => (
          <DatePicker placeholder="Choose payment due date" {...field} />
        )}
      />
    </div>
  );
}
