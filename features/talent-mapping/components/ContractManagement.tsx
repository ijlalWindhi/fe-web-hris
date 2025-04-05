import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Download } from "lucide-react";

import { Table } from "@/components/common/table";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import { InputField } from "@/components/common/input-field";
import { DatePicker } from "@/components/common/input-date-picket";
import { Button } from "@/components/ui/button";
import InputFile from "@/components/common/input-file-attachment";

import { CreateTalentMappingSchema } from "../schemas/talent-mapping.schema";
import { IResponseHistoryTalentMapping } from "@/types";
import {
  useDetailTalentMapping,
  useHistoryTalentMapping,
} from "../hooks/useTalentMapping";
import useTalentMapping from "@/stores/talent-mapping";

type TContractManagementProps = {
  form: UseFormReturn<z.infer<typeof CreateTalentMappingSchema>>;
  mode: string;
  setFileContract?: (file: File | null) => void;
};

const TableHeader: ITableHeader[] = [
  {
    key: "contract_date",
    title: "Contract Date",
    className: "min-w-[6rem]",
  },
  {
    key: "file_name",
    title: "Contract Document",
    className: "min-w-[10rem]",
  },
  { key: "action", title: "" },
];

function ContractManagement({
  form,
  mode,
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

  // functions
  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <div className="flex items-end justify-between gap-2">
        <div className="w-full">
          <InputField
            name="contract_start_date"
            label="Contract Date"
            primary
            control={form.control}
            render={({ field }) => (
              <DatePicker
                placeholder="Choose contract start date"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={mode === "view"}
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
                placeholder="Choose contract end date"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={mode === "view"}
              />
            )}
          />
        </div>
      </div>

      <InputFile
        label="Contract Document"
        defaultValue={detail?.data?.contract?.file}
        placeholder="Choose file to upload"
        accept="application/pdf"
        acceptLabel="PDF"
        onFileChange={(file) => {
          setFileContract?.(file);
        }}
        disabled={mode === "view"}
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
