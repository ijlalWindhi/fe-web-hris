import React from "react";
import { Download } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";

import { IHistoryContractTalentMonitoring } from "@/types";

const TableHeader: ITableHeader[] = [
  {
    key: "start_date",
    title: "Start Date",
    className: "min-w-[10rem]",
  },
  {
    key: "end_date",
    title: "End Date",
    className: "min-w-[10rem]",
  },
  {
    key: "contract_document",
    title: "Contract Document",
    className: "min-w-[14rem]",
  },
  { key: "action", title: "Action" },
];

export default function ContractManagement() {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="md:text-lg font-semibold">Contract Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Start</p>
              <p className="font-medium">-</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Contract Statement
              </p>
              <p className="font-medium">-</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">End</p>
              <p className="font-medium">-</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="md:text-lg font-semibold">Contract History</h2>
        <Table<IHistoryContractTalentMonitoring>
          header={TableHeader}
          data={[
            {
              id: "1",
              start_date: "2021-09-01",
              end_date: "2021-10-01",
              contract_document: "contract_document.pdf",
            },
          ]}
          loading={false}
        >
          <TableCell<IHistoryContractTalentMonitoring> name="action">
            {({ row }) => (
              <Button variant={"outline"}>
                <Download size={16} />
                Download
              </Button>
            )}
          </TableCell>
        </Table>
      </div>
    </div>
  );
}
