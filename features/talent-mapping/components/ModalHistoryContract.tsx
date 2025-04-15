import React, { useEffect } from "react";
import { Download } from "lucide-react";

import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import DialogAction from "@/components/common/dialog-action";

import { IResponseHistoryTalentMapping } from "@/types";
import useTalentMapping from "@/stores/talent-mapping";
import { useHistoryTalentMapping } from "../hooks/useTalentMapping";

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

export default function ModalHistoryContract() {
  // variables
  const {
    modalHistoryContract,
    selectedData,
    toggleModalHistoryContract,
    toggleModalDetailTalentMapping,
  } = useTalentMapping();
  const { data, isLoading, refetch } = useHistoryTalentMapping(
    selectedData?.talend_id ?? "",
  );

  // functions
  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  // lifecycle
  useEffect(() => {
    if (modalHistoryContract && selectedData?.talend_id) {
      refetch();
    }
  }, [modalHistoryContract, selectedData, refetch]);

  return (
    <DialogAction
      isOpen={modalHistoryContract}
      onClose={() => {
        toggleModalHistoryContract(false);
        toggleModalDetailTalentMapping(true);
      }}
      title={"History Contract"}
      className="max-w-full md:max-w-xl"
    >
      <div className="max-h-[50vh] overflow-y-auto">
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
    </DialogAction>
  );
}
