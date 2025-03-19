import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Plus, Pencil, Trash } from "lucide-react";

import OutletEmpty from "./OutletEmpty";
import { TableCell, type ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import ModalOutlet from "./ModalOutlet";

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
    key: "latitude",
    title: "Latitude",
  },
  {
    key: "longitude",
    title: "Longitude",
  },
  {
    key: "action",
    title: "Action",
  },
];

export default function OutletList({ form }: Readonly<TOutletListProps>) {
  // variables
  const { toggleModalAddOutlet, setSelectedOutlet } = useMasterClient();
  const { fields, append, remove, update } = useFieldArray({
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
              onClick={() => toggleModalAddOutlet(true)}
            >
              <Plus size={16} />
              Add
            </div>
          </div>
          <Table<IOutletList>
            header={TableHeader}
            data={
              fields.map((field, index) => ({
                ...field,
                latitude: parseFloat(field.latitude),
                longitude: parseFloat(field.longitude),
                index,
              })) as IOutletList[]
            }
            loading={false}
          >
            <TableCell<IOutletList> name="id">
              {({ row }) => <span>{row.id_outlet ?? "-"}</span>}
            </TableCell>
            <TableCell<IOutletList> name="action">
              {({ row }) => (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={"outline"}
                    size="icon"
                    onClick={() => {
                      setSelectedOutlet({
                        ...row,
                        index: fields.findIndex((f) => f.id === row.id_outlet),
                      });
                      toggleModalAddOutlet(true);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    size="icon"
                    onClick={() =>
                      remove(fields.findIndex((f) => f.id === row.id_outlet))
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
      <ModalOutlet append={append} update={update} />
    </div>
  );
}
