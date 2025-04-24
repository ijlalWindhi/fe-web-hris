import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/common/input-date-picket";
import InputCombobox from "@/components/common/input-combobox";

import { createTalentMappingSchema } from "../schemas/talent-mapping.schema";
import { usePtkpOptions } from "../hooks/useTalentMapping";
import { useTypeTadOptions } from "@/features/type-tad/hooks/useTypeTad";

type FormValues = z.infer<ReturnType<typeof createTalentMappingSchema>>;
type TPersonalInformationProps = {
  form: UseFormReturn<FormValues>;
  mode: string;
};

export default function PersonalInformation({
  form,
  mode,
}: Readonly<TPersonalInformationProps>) {
  // variables
  const { data: optionsPtkp } = usePtkpOptions();
  const { data: optionsTypeTad } = useTypeTadOptions();

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="talent_id"
        label="TAD ID"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="TAD ID" {...field} />
        )}
      />
      <InputField
        name="name"
        label="TAD Name"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g Dhisa"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="dob"
        label="Date of Birth"
        primary
        control={form.control}
        render={({ field }) => (
          <DatePicker
            placeholder="Choose date of birth"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="nik"
        label="ID Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 1234567890"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="email"
        label="Email Address"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            type="email"
            placeholder="e.g. dhisa@dhisapro.com"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="phone"
        label="Phone Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            type="tel"
            placeholder="e.g. 081234567890"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="address"
        label="Address"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. Jl. Raya Bogor"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="bpjs_number"
        label="BPJS TK Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 123456789"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="ptkp"
        label="Material status and PTKP"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCombobox
            field={field}
            options={
              optionsPtkp?.data?.map((item) => ({
                label: item.tipe,
                value: item.id?.toString() ?? "",
              })) || []
            }
            placeholder="Select material status and PTKP"
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="npwp"
        label="NPWP Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 123456789"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="bank_account_name"
        label="Bank Account Name"
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. Dhisa"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="bank_account_number"
        label="Bank Account Number"
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 1234567890"
            {...field}
            disabled={mode === "view"}
          />
        )}
      />
      <InputField
        name="type_tad"
        label="Type TAD"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCombobox
            field={field}
            options={
              optionsTypeTad?.data?.map((item) => ({
                label: `${item.type_tad} - ${item.type_employee}`,
                value: item.id?.toString() ?? "",
              })) || []
            }
            placeholder="Select type TAD"
            disabled={mode === "view"}
          />
        )}
      />
    </div>
  );
}
