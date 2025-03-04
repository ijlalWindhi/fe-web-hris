import React from "react";
import { Download } from "lucide-react";

import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import DialogAction from "@/components/common/dialog-action";

import { IHistoryContract } from "@/types";
import useTalentMapping from "@/stores/talent-mapping";

const TableHeader: ITableHeader[] = [
  {
    key: "contract_date",
    title: "Contract Date",
    className: "min-w-[6rem]",
  },
  {
    key: "contract_document",
    title: "Contract Document",
    className: "min-w-[10rem]",
  },
  { key: "action", title: "" },
];

export default function ModalHistoryContract() {
  // variables
  const {
    modalHistoryContract,
    toggleModalHistoryContract,
    toggleModalDetailTalentMapping,
  } = useTalentMapping();

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
      <Table<IHistoryContract>
        header={TableHeader}
        data={[
          {
            id: "1",
            contract_start_date: "1990-01-01",
            contract_end_date: "1990-01-01",
            contract_document: "1234567890",
          },
        ]}
        loading={false}
        className="!p-0"
      >
        <TableCell<IHistoryContract> name="contract_date">
          {({ row }) => (
            <div className="flex items-center gap-1">
              <span>{row.contract_start_date}</span>
              <span>-</span>
              <span>{row.contract_end_date}</span>
            </div>
          )}
        </TableCell>
        <TableCell<IHistoryContract> name="action">
          {({ row }) => (
            <Button size={"icon"} variant="outline">
              <Download size={20} />
            </Button>
          )}
        </TableCell>
      </Table>
    </DialogAction>
  );
}
