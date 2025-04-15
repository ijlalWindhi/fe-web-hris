import React, { JSX } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePayroll } from "../hooks/useTalentMonitoring";
interface IPayrollDetailsProps {
  talentId: string;
}

export default function PayrollDetails({
  talentId,
}: Readonly<IPayrollDetailsProps>) {
  // variables
  const { data } = usePayroll(talentId);

  // functions
  const renderTableRows = () => {
    const rows: JSX.Element[] = [];

    data?.data?.payroll?.forEach((monthData) => {
      const month = monthData.bulan;
      const fileUrl = monthData.file;

      monthData.header_table.forEach((type, index) => {
        rows.push(
          <tr
            key={`${month}-${type}-${index}`}
            className="border-b border-gray-200 text-sm"
          >
            {index === 0 ? (
              <td
                rowSpan={monthData.header_table.length}
                className="border px-4 py-2 text-left align-top"
              >
                <div className="flex justify-center items-center h-full">
                  {month}
                </div>
              </td>
            ) : null}
            <td className="border px-4 py-2">{type}</td>
            <td className="border px-4 py-2 text-right">
              {monthData.value[index]}
            </td>
            {index === 0 ? (
              <td
                rowSpan={monthData.header_table.length}
                className="border px-4 py-2 align-top"
              >
                <div className="flex justify-center items-center h-full">
                  <Button
                    onClick={() => {
                      window.open(fileUrl, "_blank");
                    }}
                    size={"sm"}
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </td>
            ) : null}
          </tr>,
        );
      });
    });

    return rows;
  };

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="md:text-lg font-semibold">Payroll Details</h2>
      <table className="w-full">
        <thead>
          <tr className="text-muted-foreground text-sm font-medium">
            <th className="h-10 px-4 w-40">Month</th>
            <th className="h-10 px-4">Type</th>
            <th className="h-10 px-4">Amount</th>
            <th className="h-10 px-4 w-32">Action</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}
