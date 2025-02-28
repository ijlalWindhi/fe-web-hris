/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import InfiniteCombobox from "@/components/common/input-infinite-select";

import { CreateTalentMappingSchema } from "../schemas/talent-mapping.schema";

type TClientIdentificationProps = {
  form: UseFormReturn<z.infer<typeof CreateTalentMappingSchema>>;
};

export default function ClientIdentification({
  form,
}: Readonly<TClientIdentificationProps>) {
  // functions
  const getOptionClientName = async () => {
    return {
      data: [
        {
          id: 1,
          zona: "Zona 1",
        },
        {
          id: 2,
          zona: "Zona 2",
        },
        {
          id: 3,
          zona: "Zona 3",
        },
      ],
      total: 3,
    } as any;
  };
  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="client_name"
        label="Client Name"
        primary
        control={form.control}
        render={({ field }) => (
          <InfiniteCombobox
            value={field.value}
            defaultValue={""}
            onChange={(value) => console.log("JOSSSS")}
            onClear={() => console.log("MASUKKK")}
            fetchData={() => getOptionClientName()}
            valueKey="id"
            labelKey="zona"
            pageSize={10}
            placeholder="Select client name"
            className="w-full"
          />
        )}
      />
      <InputField
        name="client_id"
        label="Client ID"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Client ID" {...field} />
        )}
      />
      <InputField
        name="client_address"
        label="Client Address"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Client Address" {...field} />
        )}
      />
      <InputField
        name="outlet_mapping"
        label="Outlet Mapping"
        primary
        control={form.control}
        render={({ field }) => (
          <InfiniteCombobox
            value={field.value}
            defaultValue={""}
            onChange={(value) => console.log("JOSSSS")}
            onClear={() => console.log("MASUKKK")}
            fetchData={getOptionClientName}
            valueKey="id"
            labelKey="zona"
            pageSize={10}
            placeholder="Select outlet"
            className="w-full"
          />
        )}
      />
      <InputField
        name="outlet_id"
        label="Outlet ID"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Outlet ID" {...field} />
        )}
      />
      <InputField
        name="outlet_address"
        label="Outlet Address"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Outlet Address" {...field} />
        )}
      />
    </div>
  );
}
