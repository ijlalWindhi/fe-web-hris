import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Download } from "lucide-react";

import { Table } from "@/components/common/table";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import { InputField } from "@/components/common/input-field";
import { DatePicker } from "@/components/common/input-date-picket";
import { Button } from "@/components/ui/button";
import { InputCurrency } from "@/components/common/input-currency";
import InputFile from "@/components/common/input-file-attachment";

import { createTalentMappingSchema } from "../schemas/talent-mapping.schema";
import { IResponseHistoryTalentMapping } from "@/types";
import {
  useDetailTalentMapping,
  useHistoryTalentMapping,
} from "../hooks/useTalentMapping";
import useTalentMapping from "@/stores/talent-mapping";
import { hasPermission } from "@/utils/get-permission";

type FormValues = z.infer<ReturnType<typeof createTalentMappingSchema>>;
type TContractManagementProps = {
  form: UseFormReturn<FormValues>;
  setFileContract?: (file: File | null) => void;
};

const TableHeader: ITableHeader[] = [
  {
    key: "contract_date",
    title: "Tanggal Kontrak",
    className: "min-w-[13rem]",
  },
  {
    key: "file_name",
    title: "Dokumen Kontrak",
    className: "min-w-[10rem]",
  },
  { key: "action", title: "" },
];

function ContractManagement({
  form,
  setFileContract,
}: Readonly<TContractManagementProps>) {
  // variables
  const { selectedData } = useTalentMapping();
  const { data: detail } = useDetailTalentMapping(
    selectedData?.talend_id ?? "",
  );
  const { data, isLoading } = useHistoryTalentMapping(
    selectedData?.talend_id ?? "",
  );
  const isEdit = hasPermission("Talent Mapping", "add contract");

  // functions
  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <InputField
        name="current_salary"
        label="Gaji Saat Ini"
        control={form.control}
        render={({ field }) => (
          <InputCurrency
            placeholder="e.g. 1.000.000"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={!isEdit}
          />
        )}
      />

      <div className="flex items-end justify-between gap-2">
        <div className="w-full">
          <InputField
            name="contract_start_date"
            label="Tanggal Kontrak"
            primary
            control={form.control}
            render={({ field }) => (
              <DatePicker
                placeholder="Pilih tanggal mulai kontrak"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={!isEdit}
              />
            )}
          />
        </div>
        <span className="pb-2">-</span>
        <div className="w-full">
          <InputField
            name="contract_end_date"
            primary
            control={form.control}
            render={({ field }) => (
              <DatePicker
                placeholder="Pilih tanggal akhir kontrak"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={!isEdit}
              />
            )}
          />
        </div>
      </div>

      <InputField
        name="resign_date"
        label="Tanggal Resign"
        control={form.control}
        render={({ field }) => (
          <DatePicker
            placeholder="Pilih tanggal resign"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={!isEdit}
          />
        )}
      />
      <InputFile
        label="File Kontrak"
        defaultValue={detail?.data?.contract?.file}
        placeholder="Pilih file untuk diunggah"
        accept="application/pdf"
        acceptLabel="PDF"
        onFileChange={(file) => {
          setFileContract?.(file);
        }}
        disabled={!isEdit}
      />

      <Table<IResponseHistoryTalentMapping>
        header={TableHeader}
        data={data?.data ?? []}
        loading={isLoading}
        className="!p-0"
      >
        <TableCell<IResponseHistoryTalentMapping> name="contract_date">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <span>{row.start_date}</span>
              <span>-</span>
              <span>{row.end_date}</span>
            </div>
          )}
        </TableCell>
        <TableCell<IResponseHistoryTalentMapping> name="action">
          {({ row }) => (
            <Button
              type="button"
              size={"icon"}
              variant="outline"
              onClick={() => handleDownload(row.file)}
            >
              <Download size={20} />
            </Button>
          )}
        </TableCell>
      </Table>
    </div>
  );
}

export default ContractManagement;
