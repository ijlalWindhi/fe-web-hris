import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/common/input-date-picket";

import { CreateTalentMappingSchema } from "../schemas/talent-mapping.schema";

type TPersonalInformationProps = {
  form: UseFormReturn<z.infer<typeof CreateTalentMappingSchema>>;
};

export default function PersonalInformation({
  form,
}: Readonly<TPersonalInformationProps>) {
  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="talent_id"
        label="Talent ID"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Talent ID" {...field} />
        )}
      />
      <InputField
        name="workdays"
        label="Workdays"
        primary
        control={form.control}
        render={({ field }) => <Input placeholder="e.g. Dhisa" {...field} />}
      />
      <InputField
        name="date_of_birth"
        label="Date of Birth"
        primary
        control={form.control}
        render={({ field }) => (
          <DatePicker placeholder="Choose date of birth" {...field} />
        )}
      />
      <InputField
        name="id_number"
        label="ID Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input placeholder="e.g. 1234567890" {...field} />
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
          />
        )}
      />
      <InputField
        name="phone_number"
        label="Phone Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input type="tel" placeholder="e.g. 081234567890" {...field} />
        )}
      />
      <InputField
        name="address"
        label="Address"
        primary
        control={form.control}
        render={({ field }) => (
          <Input placeholder="e.g. Jl. Raya Bogor" {...field} />
        )}
      />
    </div>
  );
}
