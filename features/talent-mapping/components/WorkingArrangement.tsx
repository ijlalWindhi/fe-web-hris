import React from "react";
import { Info } from "lucide-react";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";

import { TShift } from "@/types";
import useTalentMapping from "@/stores/talent-mapping";
import { useDetailTalentMapping } from "../hooks/useTalentMapping";

const TableHeader: ITableHeader[] = [
  {
    key: "label",
    title: "",
    className: "min-w-[6rem]",
  },
  {
    key: "shift_id",
    title: "",
    className: "min-w-[8rem]",
  },
  {
    key: "day",
    title: "",
    className: "min-w-[8rem]",
  },
  {
    key: "time",
    title: "",
    className: "min-w-[8rem]",
  },
];

export default function WorkingArrangement() {
  // variables
  const {
    selectedData,
    toggleModalDetailWorkingArrangement,
    setClientId,
    setOutletId,
  } = useTalentMapping();
  const { data, isLoading } = useDetailTalentMapping(
    selectedData?.talend_id ?? "",
  );

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      <div className="flex justify-between items-center gap-3">
        <h2 className="font-medium text-sm">
          Jumlah Hari : {data?.data?.workdays ?? 0}
        </h2>
        {selectedData && (
          <Button
            size="sm"
            onClick={() => {
              toggleModalDetailWorkingArrangement(true);
              setClientId(data?.data?.client?.id ?? "");
              setOutletId(data?.data?.outlet?.id ?? "");
            }}
            type="button"
          >
            <Info size={16} />
            Detail
          </Button>
        )}
      </div>
      <Table<TShift>
        header={TableHeader}
        data={data?.data?.shift ?? []}
        loading={isLoading}
        withoutHeader={true}
      >
        <TableCell<TShift> name="label">
          {() => <span>Shift ID</span>}
        </TableCell>
        <TableCell<TShift> name="time">
          {({ row }) => {
            return (
              <div className="flex gap-1">
                <span>{row.start_time}</span>
                <span>-</span>
                <span>{row.end_time}</span>
              </div>
            );
          }}
        </TableCell>
      </Table>
    </div>
  );
}
