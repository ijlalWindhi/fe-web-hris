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
};

export default function ClientIdentification({
  form,
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
        label="Nama Klien"
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
            placeholder="Pilih nama klien"
            onChange={(value) => handleClientChange(value)}
          />
        )}
      />
      <InputField
        name="client_id"
        label="ID Klien"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="ID Klien" {...field} />
        )}
      />
      <InputField
        name="client_address"
        label="Alamat Klien"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Alamat Klien" {...field} />
        )}
      />
      <InputField
        name="outlet_mapping"
        label="Pemetaan Outlet"
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
            placeholder="Pilih outlet"
            onChange={(value) => handleOutletChange(value)}
            disabled={form.watch("client_id") === ""}
          />
        )}
      />
      <InputField
        name="outlet_id"
        label="ID Outlet"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="ID Outlet" {...field} />
        )}
      />
      <InputField
        name="outlet_address"
        label="Alamat Outlet"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="Alamat Outlet" {...field} />
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
