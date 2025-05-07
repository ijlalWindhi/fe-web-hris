"use client";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { ITableHeader } from "@/components/ui/table";
import DialogAction from "@/components/common/dialog-action";

import useTheme from "@/stores/theme";
import { IResponseNotPresence } from "@/types";
import { useNotPresence } from "../hooks/useDashboard";
import { useEffect } from "react";

const TableHeader: ITableHeader[] = [
  {
    key: "talent_id",
    title: "ID TAD",
    className: "min-w-[6rem]",
  },
  {
    key: "talent_name",
    title: "Nama TAD",
    className: "min-w-[8rem]",
  },
  {
    key: "client_name",
    title: "Nama Client",
    className: "min-w-[8rem]",
  },
  {
    key: "outlet_name",
    title: "Nama Outlet",
    className: "min-w-[8rem]",
  },
  {
    key: "shift",
    title: "Jadwal Shift",
    className: "min-w-[8rem]",
  },
  {
    key: "phone",
    title: "No. Telepon",
    className: "min-w-[8rem]",
  },
];

export default function ModalNotPresence() {
  // variables
  const { modalNotPresence, setModalNotPresence } = useTheme();
  const { data, isLoading } = useNotPresence();
  return (
    <DialogAction
      isOpen={modalNotPresence}
      onClose={() => setModalNotPresence(false)}
      title={"Detail Tidak Hadir"}
      className="max-w-full md:max-w-2xl"
    >
      <div className="max-h-[50vh] overflow-y-auto space-y-2">
        <Table<IResponseNotPresence>
          header={TableHeader}
          data={data?.data || []}
          loading={isLoading}
        ></Table>
        <Button onClick={() => setModalNotPresence(false)} className="w-full">
          Tutup
        </Button>
      </div>
    </DialogAction>
  );
}
