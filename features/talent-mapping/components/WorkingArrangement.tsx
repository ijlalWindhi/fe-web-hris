import React from "react";
import { Info, MinusCircle } from "lucide-react";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { ITableHeader, TableCell } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import InputNumber from "@/components/common/input-number";
import InputTimePicker from "@/components/common/input-time-picker";
import InputCombobox from "@/components/common/input-combobox";

import { TShift } from "@/types";
import useTalentMapping from "@/stores/talent-mapping";
import { useDetailTalentMapping } from "../hooks/useTalentMapping";
import { createTalentMappingSchema } from "../schemas/talent-mapping.schema";

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

type FormValues = z.infer<ReturnType<typeof createTalentMappingSchema>>;
type TWorkingArrangementsProps = {
  form: UseFormReturn<FormValues>;
  fields: Array<{
    id: string;
    shift_id: string;
    day: string;
    start_time: string;
    end_time: string;
  }>;
  append: (value: {
    day: string;
    start_time: string;
    end_time: string;
  }) => void;
  remove: (index: number) => void;
};
export default function WorkingArrangement({
  form,
  fields,
  append,
  remove,
}: Readonly<TWorkingArrangementsProps>) {
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
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Pengaturan Kerja</h2>
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
      <InputField
        name="total_working_days"
        label="Jumlah Hari"
        control={form.control}
        render={({ field }) => (
          <InputNumber
            value={field.value}
            onChange={field.onChange}
            onChangeIncrement={() => {
              append({
                day: "",
                start_time: "00:00",
                end_time: "00:00",
              });
            }}
            onChangeDecrement={() => {
              if (fields.length > 0) {
                remove(fields.length - 1);
              }
            }}
            readonly={true}
            min={0}
            max={7}
          />
        )}
      />
      {fields?.map((item, index) => (
        <div key={item.id} className="flex items-end space-x-2">
          <InputField
            name={`working_arrangements.${index}.shift_id`}
            label="Shift ID"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value}
                onChange={field.onChange}
                disabled
                placeholder="Shift ID"
                className="w-[4.5rem]"
              />
            )}
          />
          <InputField
            name={`working_arrangements.${index}.day`}
            label="Hari"
            primary
            control={form.control}
            render={({ field }) => (
              <InputCombobox
                field={field}
                options={[
                  { label: "Senin", value: "Monday" },
                  { label: "Selasa", value: "Tuesday" },
                  { label: "Rabu", value: "Wednesday" },
                  { label: "Kamis", value: "Thursday" },
                  { label: "Jum'at", value: "Friday" },
                  { label: "Sabtu", value: "Saturday" },
                  { label: "Minggu", value: "Sunday" },
                ]}
                className="min-w-[9rem]"
              />
            )}
          />
          <InputField
            name={`working_arrangements.${index}.start_time`}
            label="Waktu"
            primary
            control={form.control}
            render={({ field }) => (
              <InputTimePicker
                {...field}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <InputField
            name={`working_arrangements.${index}.end_time`}
            control={form.control}
            render={({ field }) => (
              <InputTimePicker
                {...field}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => remove(index)}
            className="min-w-10"
          >
            <MinusCircle size={16} />
          </Button>
        </div>
      ))}
    </div>
    //     <div className="flex justify-between items-center gap-3">
    //   <h2 className="font-medium text-sm">
    //     Jumlah Hari : {data?.data?.workdays ?? 0}
    //   </h2>
    //   {selectedData && (
    //     <Button
    //       size="sm"
    //       onClick={() => {
    //         toggleModalDetailWorkingArrangement(true);
    //         setClientId(data?.data?.client?.id ?? "");
    //         setOutletId(data?.data?.outlet?.id ?? "");
    //       }}
    //       type="button"
    //     >
    //       <Info size={16} />
    //       Detail
    //     </Button>
    //   )}
    // </div>
    // <Table<TShift>
    //   header={TableHeader}
    //   data={data?.data?.shift ?? []}
    //   loading={isLoading}
    //   withoutHeader={true}
    // >
    //   <TableCell<TShift> name="label">
    //     {() => <span>Shift ID</span>}
    //   </TableCell>
    //   <TableCell<TShift> name="time">
    //     {({ row }) => {
    //       return (
    //         <div className="flex gap-1">
    //           <span>{row.start_time}</span>
    //           <span>-</span>
    //           <span>{row.end_time}</span>
    //         </div>
    //       );
    //     }}
    //   </TableCell>
    // </Table>
  );
}
