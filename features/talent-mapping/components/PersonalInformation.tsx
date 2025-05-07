import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/common/input-date-picket";
import InputCombobox from "@/components/common/input-combobox";

import { createTalentMappingSchema } from "../schemas/talent-mapping.schema";
import {
  usePtkpOptions,
  useRoleTalentMappingOptions,
} from "../hooks/useTalentMapping";
import { useTypeTadOptions } from "@/features/type-tad/hooks/useTypeTad";

type FormValues = z.infer<ReturnType<typeof createTalentMappingSchema>>;
type TPersonalInformationProps = {
  form: UseFormReturn<FormValues>;
};

export default function PersonalInformation({
  form,
}: Readonly<TPersonalInformationProps>) {
  // variables
  const { data: optionsPtkp } = usePtkpOptions();
  const { data: optionsTypeTad } = useTypeTadOptions();
  const { data: optionsRole } = useRoleTalentMappingOptions();

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="talent_id"
        label="ID TAD"
        primary
        control={form.control}
        render={({ field }) => (
          <Input disabled placeholder="ID TAD" {...field} />
        )}
      />
      <InputField
        name="name"
        label="Nama TAD"
        primary
        control={form.control}
        render={({ field }) => <Input placeholder="e.g Dhisa" {...field} />}
      />
      <InputField
        name="dob"
        label="Tanggal Lahir"
        primary
        control={form.control}
        render={({ field }) => (
          <DatePicker
            placeholder="Pilih Tanggal Lahir"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <InputField
        name="tempat_lahir"
        label="Tempat Lahir"
        control={form.control}
        render={({ field }) => <Input placeholder="e.g Jakarta" {...field} />}
      />
      <InputField
        name="nik"
        label="NIK"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 1234567890"
            {...field}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              field.onChange(value);
            }}
          />
        )}
      />
      <InputField
        name="kk"
        label="Kartu Keluarga"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 1234567890"
            {...field}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              field.onChange(value);
            }}
          />
        )}
      />
      <InputField
        name="email"
        label="Email"
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
        name="phone"
        label="Nomor Telepon"
        primary
        control={form.control}
        render={({ field }) => (
          <Input
            type="tel"
            placeholder="e.g. 081234567890"
            {...field}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              field.onChange(value);
            }}
          />
        )}
      />
      <InputField
        name="address"
        label="Alamat"
        primary
        control={form.control}
        render={({ field }) => (
          <Input placeholder="e.g. Jl. Raya Bogor" {...field} />
        )}
      />
      <InputField
        name="gender"
        label="Jenis Kelamin"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCombobox
            field={field}
            options={[
              { label: "Laki-laki", value: "0" },
              { label: "Perempuan", value: "1" },
            ]}
            placeholder="Pilih Jenis Kelamin"
          />
        )}
      />
      <InputField
        name="bpjs_number"
        label="Nomor BPJS TK"
        control={form.control}
        render={({ field }) => (
          <Input
            placeholder="e.g. 123456789"
            {...field}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "");
              field.onChange(value);
            }}
          />
        )}
      />
      <InputField
        name="ptkp"
        label="Material status dan PTKP"
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
            placeholder="Pilih material status dan PTKP"
          />
        )}
      />
      <InputField
        name="npwp"
        label="Nomor NPWP"
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
        name="bank_account_name"
        label="Nama Rekening Bank"
        control={form.control}
        render={({ field }) => <Input placeholder="e.g. Dhisa" {...field} />}
      />
      <InputField
        name="bank_account_number"
        label="Nomor Rekening Bank"
        control={form.control}
        render={({ field }) => (
          <Input placeholder="e.g. 1234567890" {...field} />
        )}
      />
      <InputField
        name="type_tad"
        label="Tipe TAD"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCombobox
            field={field}
            options={
              optionsTypeTad?.data?.map((item) => ({
                label: `${item.type_tad} - ${item.type_employee} (${item.client_name})`,
                value: item.id?.toString() ?? "",
              })) || []
            }
            placeholder="Pilih Tipe TAD"
          />
        )}
      />
      <InputField
        name="role_id"
        label="Role Pengguna"
        primary
        control={form.control}
        render={({ field }) => (
          <InputCombobox
            field={field}
            options={
              optionsRole?.data?.map((item) => ({
                label: item.name,
                value: item.id?.toString() ?? "",
              })) || []
            }
            placeholder="Pilih Role Pengguna"
          />
        )}
      />
    </div>
  );
}
