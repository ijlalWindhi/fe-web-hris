import React from "react";
import dynamic from "next/dynamic";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Plus, Pencil, Trash } from "lucide-react";

import OutletEmpty from "./OutletEmpty";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
const ModalOutlet = dynamic(() => import("./ModalOutlet"));

import useMasterClient from "@/stores/master-client";
import { CreateMasterClientSchema } from "../schemas/master-client.schema";
import { IOutletList } from "@/types";

type TOutletListProps = {
  form: UseFormReturn<z.infer<typeof CreateMasterClientSchema>>;
};

const TableHeader: ITableHeader[] = [
  {
    key: "id",
    title: "Outlet ID",
    className: "min-w-[6rem]",
  },
  {
    key: "name",
    title: "Outlet Name",
    className: "min-w-[10rem]",
  },
  {
    key: "address",
    title: "Client Address",
    className: "min-w-[16rem]",
  },
  {
    key: "lat",
    title: "Latitude",
  },
  {
    key: "long",
    title: "Longitude",
  },
  {
    key: "action",
    title: "Action",
  },
];

export default function OutletList({ form }: Readonly<TOutletListProps>) {
  // variables
  const { toggleModalDetailMasterClient, setSelectedOutletId } =
    useMasterClient();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "outlet",
  });

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
      {fields.length === 0 ? (
        <OutletEmpty />
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-3">
            <p className="text-sm">Outlet List</p>
            <div
              className="flex items-center text-primary cursor-pointer gap-1 text-sm"
              onClick={() => toggleModalDetailMasterClient(true)}
            >
              <Plus size={16} />
              Add
            </div>
          </div>
          <Table<IOutletList>
            header={TableHeader}
            data={
              fields.map((field) => ({
                ...field,
              })) as IOutletList[]
            }
            loading={false}
          >
            <TableCell<IOutletList> name="action">
              {({ row }) => (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={"outline"}
                    size="icon"
                    onClick={() => {
                      setSelectedOutletId(row.id);
                      toggleModalDetailMasterClient(true);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    size="icon"
                    onClick={() =>
                      remove(fields.findIndex((f) => f.id === row.id))
                    }
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              )}
            </TableCell>
          </Table>
        </div>
      )}
      <ModalOutlet />
    </div>
  );
}
