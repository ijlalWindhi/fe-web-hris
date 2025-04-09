import React from "react";

import { ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";

import { IPayrollDetailsTaletMonitoring } from "@/types";
import { usePayroll } from "../hooks/useTalentMonitoring";

const TableHeader: ITableHeader[] = [
  {
    key: "month",
    title: "Month",
    className: "min-w-[8rem]",
  },
  {
    key: "gaji_pokok",
    title: "Gaji Pokok",
    className: "min-w-[11rem]",
  },
  {
    key: "tunjangan_makan",
    title: "Tunjangan Makan",
    className: "min-w-[11rem]",
  },
  {
    key: "bpjs_kesehatan",
    title: "BPJS Kesehatan",
    className: "min-w-[11rem]",
  },
  {
    key: "bonus",
    title: "Bonus Performance",
    className: "min-w-[11rem]",
  },
  {
    key: "pajak_pph21",
    title: "Potongan Pajak",
    className: "min-w-[11rem]",
  },
  {
    key: "agency_fee",
    title: "Agency Fee (%)",
    className: "min-w-[11rem]",
  },
  {
    key: "total",
    title: "Total",
    className: "min-w-[11rem]",
  },
];

interface IPayrollDetailsProps {
  talentId: string;
}

export default function PayrollDetails({
  talentId,
}: Readonly<IPayrollDetailsProps>) {
  // variables
  const { data, isLoading } = usePayroll(talentId);

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="md:text-lg font-semibold">Payroll Details</h2>
      <Table<IPayrollDetailsTaletMonitoring>
        header={TableHeader}
        data={data?.data?.payroll ?? []}
        loading={isLoading}
      ></Table>
    </div>
  );
}
