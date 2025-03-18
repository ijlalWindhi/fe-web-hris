import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";

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
        name="name"
        label="Client Name"
        primary
        control={form.control}
        render={({ field }) => <Input placeholder="e.g. PT. ABC" {...field} />}
      />
      <InputField
        name="address"
        label="Client Address"
        primary
        control={form.control}
        render={({ field }) => <Input placeholder="e.g. Jl. Raya" {...field} />}
      />
      <InputField
        name="cs_person"
        label="CS Name"
        primary
        control={form.control}
        render={({ field }) => <Input placeholder="e.g. John Doe" {...field} />}
      />
      <InputField
        name="cs_number"
        label="CS Number"
        primary
        control={form.control}
        render={({ field }) => (
          <Input type="tel" placeholder="e.g. 081234567890" {...field} />
        )}
      />
      <InputField
        name="cs_email"
        label="CS Email"
        primary
        control={form.control}
        render={({ field }) => (
          <Input type="email" placeholder="e.g. dhisa@mail.com" {...field} />
        )}
      />
    </div>
  );
}
