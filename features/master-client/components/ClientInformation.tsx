"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/common/input-date-picket";
import InputFile from "@/components/common/input-file-attachment";

import { CreateMasterClientSchema } from "../schemas/master-client.schema";
import { IResponseDetailMasterClient } from "@/types";

type TClientInformationProps = {
  form: UseFormReturn<z.infer<typeof CreateMasterClientSchema>>;
  setFileContract: (file: File | null) => void;
  detailData: IResponseDetailMasterClient;
};

export default function ClientInformation({
  form,
  setFileContract,
  detailData,
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
        name="npwp"
        label="NPWP"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 123456789"
            {...field}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              field.onChange(value);
            }}
          />
        )}
      />
      <InputField
        name="brand_name"
        label="Adjustable Brand Name"
        primary
        control={form.control}
        render={({ field }) => <Input placeholder="e.g. Maju+" {...field} />}
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
      <InputField
        name="start_contract"
        label="Start Contract"
        primary
        control={form.control}
        render={({ field }) => (
          <DatePicker
            placeholder="Choose start contract date"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <InputField
        name="end_contract"
        label="End Contract"
        primary
        control={form.control}
        render={({ field }) => (
          <DatePicker
            placeholder="Choose end contract date"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <InputFile
        label="Contract Document"
        defaultValue={detailData?.file_contract}
        placeholder="Choose file to upload"
        accept="application/pdf"
        acceptLabel="PDF"
        onFileChange={(file) => {
          setFileContract?.(file);
        }}
      />
    </div>
  );
}
