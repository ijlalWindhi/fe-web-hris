import React, { JSX } from "react";

// import { ITableHeader } from "@/components/ui/table";
// import { Table } from "@/components/common/table";

// import { IPayrollDetailsTaletMonitoring } from "@/types";
import { usePayroll } from "../hooks/useTalentMonitoring";

// const TableHeader: ITableHeader[] = [
//   {
//     key: "month",
//     title: "Month",
//     className: "min-w-[8rem]",
//   },
//   {
//     key: "gaji_pokok",
//     title: "Gaji Pokok",
//     className: "min-w-[11rem]",
//   },
//   {
//     key: "tunjangan_makan",
//     title: "Tunjangan Makan",
//     className: "min-w-[11rem]",
//   },
//   {
//     key: "bpjs_kesehatan",
//     title: "BPJS Kesehatan",
//     className: "min-w-[11rem]",
//   },
//   {
//     key: "bonus",
//     title: "Bonus Performance",
//     className: "min-w-[11rem]",
//   },
//   {
//     key: "pajak_pph21",
//     title: "Potongan Pajak",
//     className: "min-w-[11rem]",
//   },
//   {
//     key: "agency_fee",
//     title: "Agency Fee (%)",
//     className: "min-w-[11rem]",
//   },
//   {
//     key: "total",
//     title: "Total",
//     className: "min-w-[11rem]",
//   },
// ];

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

    // Process each month's data
    data?.data?.payroll?.forEach((monthData) => {
      const month = monthData.bulan;

      // Create rows for each header item in this month
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
                {month}
              </td>
            ) : null}
            <td className="border px-4 py-2">{type}</td>
            <td className="border px-4 py-2 text-right">
              {monthData.value[index]}
            </td>
          </tr>,
        );
      });
    });

    return rows;
  };

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="md:text-lg font-semibold">Payroll Details</h2>
      {/* <Table<IPayrollDetailsTaletMonitoring>
        header={TableHeader}
        data={data?.data?.payroll ?? []}
        loading={isLoading}
      ></Table> */}
      <table className="w-full">
        <thead>
          <tr className="text-muted-foreground text-sm font-medium">
            <th className="h-10 px-4">Month</th>
            <th className="h-10 px-4">Type</th>
            <th className="h-10 px-4">Amount</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}
