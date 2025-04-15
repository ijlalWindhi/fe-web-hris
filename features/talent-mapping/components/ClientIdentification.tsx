/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import InputCombobox from "@/components/common/input-combobox";

import { createTalentMappingSchema } from "../schemas/talent-mapping.schema";
import useTalentMapping from "@/stores/talent-mapping";

type FormValues = z.infer<ReturnType<typeof createTalentMappingSchema>>;
type TClientIdentificationProps = {
  form: UseFormReturn<FormValues>;
  mode: string;
};

export default function ClientIdentification({
  form,
  mode,
}: Readonly<TClientIdentificationProps>) {
  // variables
  const { optionsClient, optionsOutlet, fetchOptionsOutlet } =
    useTalentMapping();

  // functions
  const handleClientChange = async (value: string) => {
    await fetchOptionsOutlet(value);
    const client = optionsClient?.find((item) => item.id?.toString() === value);
    form.setValue("client_id", client?.id_client ?? "");
    form.setValue("client_address", client?.address ?? "");
    form.setValue("outlet_mapping", "");
    form.setValue("outlet_id", "");
    form.setValue("outlet_address", "");
    form.setValue("outlet_lat", "");
    form.setValue("outlet_long", "");
  };

  const handleOutletChange = async (value: string) => {
    const outlet = optionsOutlet?.find((item) => item.id?.toString() === value);
    form.setValue("outlet_id", outlet?.outlet_id ?? "");
    form.setValue("outlet_address", outlet?.address ?? "");
    form.setValue("outlet_lat", outlet?.latitude?.toString() ?? "");
    form.setValue("outlet_long", outlet?.longitude?.toString() ?? "");
  };

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="client_name"
        label="Client Name"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCombobox
            field={field}
            options={
              optionsClient?.map((item) => ({
                label: item.name,
                value: item.id?.toString() ?? "",
              })) || []
            }
            placeholder="Select client name"
            onChange={(value) => handleClientChange(value)}
            disabled={mode === "view"}
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
          <InputCombobox
            field={field}
            options={
              optionsOutlet?.map((item) => ({
                label: item.name,
                value: item.id?.toString() ?? "",
              })) || []
            }
            placeholder="Select outlet"
            onChange={(value) => handleOutletChange(value)}
            disabled={form.watch("client_id") === "" || mode === "view"}
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
      <InputField
        name="outlet_lat"
        label="Outlet Latitude"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Outlet Latitude" {...field} />
        )}
      />
      <InputField
        name="outlet_long"
        label="Outlet Longitude"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Outlet Longitude" {...field} />
        )}
      />
    </div>
  );
}
