import React from "react";

import { ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";

import { IPayrollDetailsTaletMonitoring } from "@/types";

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
    key: "tunjangan_bensin",
    title: "Tunjangan Bensin",
    className: "min-w-[11rem]",
  },
  {
    key: "bonus_performance",
    title: "Bonus Performance",
    className: "min-w-[11rem]",
  },
  {
    key: "potongan_pajak",
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

export default function PayrollDetails() {
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="md:text-lg font-semibold">Payroll Details</h2>
      <Table<IPayrollDetailsTaletMonitoring>
        header={TableHeader}
        data={[
          {
            id: "1",
            month: "January 2021",
            gaji_pokok: "Rp 1.000.000",
            tunjangan_makan: "Rp 500.000",
            tunjangan_bensin: "Rp 0",
            bonus_performance: "Rp 0",
            potongan_pajak: "Rp 0",
            agency_fee: "5%",
            total: "Rp 1.500.000",
          },
          {
            id: "2",
            month: "February 2021",
            gaji_pokok: "Rp 1.000.000",
            tunjangan_makan: "Rp 500.000",
            tunjangan_bensin: "Rp 0",
            bonus_performance: "Rp 0",
            potongan_pajak: "Rp 0",
            agency_fee: "5%",
            total: "Rp 1.500.000",
          },
        ]}
        loading={false}
      ></Table>
    </div>
  );
}
