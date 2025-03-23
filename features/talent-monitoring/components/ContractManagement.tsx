import React from "react";
import { Download } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";

import { useContract } from "../hooks/useTalentMonitoring";
import { IHistoryContractTalentMonitoring } from "@/types";
import { truncateText } from "@/utils/truncate";

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
    key: "file",
    title: "Contract Document",
    className: "min-w-[14rem]",
  },
  { key: "action", title: "Action" },
];

interface IContractManagementProps {
  talentId: string;
}

export default function ContractManagement({
  talentId,
}: Readonly<IContractManagementProps>) {
  // variables
  const { data } = useContract(talentId);

  // functions
  const handleDownload = (url: string) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error from handleDownload: ", error);
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="md:text-lg font-semibold">Contract Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Start</p>
              <p className="font-medium">
                {data?.data?.contract?.start_date ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Contract Statement
              </p>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => handleDownload(data?.data?.contract?.file ?? "")}
              >
                <p className="font-medium hover:text-primary hover:underline">
                  {truncateText(data?.data?.contract?.file ?? "", 40) ?? "-"}
                </p>
                <Download className="text-primary" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">End</p>
              <p className="font-medium">
                {data?.data?.contract?.end_date ?? "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="md:text-lg font-semibold">Contract History</h2>
        <Table<IHistoryContractTalentMonitoring>
          header={TableHeader}
          data={data?.data?.history ?? []}
          loading={false}
        >
          <TableCell<IHistoryContractTalentMonitoring> name="file">
            {({ row }) => <span>{truncateText(row.file ?? "", 40)}</span>}
          </TableCell>
          <TableCell<IHistoryContractTalentMonitoring> name="action">
            {({ row }) => (
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => handleDownload(row.file)}
              >
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
