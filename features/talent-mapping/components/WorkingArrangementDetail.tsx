import React, { useEffect } from "react";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, MinusCircle } from "lucide-react";

import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/input-field";
import { Input } from "@/components/ui/input";
import InputNumber from "@/components/common/input-number";
import InputTimePicker from "@/components/common/input-time-picker";
import { Button } from "@/components/ui/button";
import InputCombobox from "@/components/common/input-combobox";

import useTalentMapping from "@/stores/talent-mapping";
import useTheme from "@/stores/theme";
import {
  useDetailTalentMapping,
  useUpdateTalentMapping,
  useViewTalentMapping,
} from "../hooks/useTalentMapping";
import { WorkingArrangementSchema } from "../schemas/talent-mapping.schema";
import { TPayloadTalentMapping } from "@/types";

function WorkingArrangementDetail() {
  // variables
  const {
    selectedData,
    toggleModalDetailTalentMapping,
    toggleModalDetailWorkingArrangement,
    setClientId,
    setOutletId,
  } = useTalentMapping();
  const { setModalSuccess } = useTheme();
  const { data, refetch } = useDetailTalentMapping(
    selectedData?.talend_id ?? "",
  );
  const { data: viewData } = useViewTalentMapping(
    selectedData?.talend_id ?? "",
  );
  const updateWorkingArrangement = useUpdateTalentMapping();
  const form = useForm<z.infer<typeof WorkingArrangementSchema>>({
    resolver: zodResolver(WorkingArrangementSchema),
    defaultValues: {
      total_working_days: 0,
      working_arrangements: [
        {
          day: "",
          start_time: "00:00",
          end_time: "00:00",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "working_arrangements",
  });

  // functions
  const onSubmit = async (values: z.infer<typeof WorkingArrangementSchema>) => {
    try {
      const payload: TPayloadTalentMapping = {
        shift: values.working_arrangements.map((item) => ({
          shift_id: item.shift_id,
          day: item.day,
          start_time: item.start_time,
          end_time: item.end_time,
        })),
      };
      const res = await updateWorkingArrangement.mutateAsync({
        id: selectedData?.talend_id ?? "-",
        data: payload,
      });
      if (res.status === "success") {
        setModalSuccess({
          open: true,
          title: "TAD Successfully Updated",
          message:
            "The TAD's information has been updated and saved successfully.",
          actionVariant: "default",
          actionMessage: "Back",
          action: () => {
            form.reset();
            refetch();
            toggleModalDetailTalentMapping(false);
          },
          animation: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (data) {
      const working_arrangements = data?.data?.shift.map((item) => ({
        day: item.day,
        start_time: item.start_time,
        end_time: item.end_time,
        shift_id: item.shift_id,
      }));
      form.setValue("working_arrangements", working_arrangements || []);
      form.setValue("total_working_days", data?.data?.shift?.length || 0);
    }
  }, [data, form]);

  return (
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6">
    //     <div className="space-y-2 max-h-[50vh] overflow-y-auto p-2">
    //       <InputField
    //         name="total_working_days"
    //         label="Working Arrangement"
    //         control={form.control}
    //         render={({ field }) => (
    //           <InputNumber
    //             value={field.value}
    //             onChange={field.onChange}
    //             onChangeIncrement={() => {
    //               append({
    //                 day: "",
    //                 start_time: "00:00",
    //                 end_time: "00:00",
    //               });
    //             }}
    //             onChangeDecrement={() => {
    //               if (fields.length > 0) {
    //                 remove(fields.length - 1);
    //               }
    //             }}
    //             readonly={true}
    //             min={0}
    //             max={7}
    //           />
    //         )}
    //       />
    //       {fields.map((item, index) => (
    //         <div key={item.id} className="flex items-end space-x-2">
    //           <InputField
    //             name={`working_arrangements.${index}.shift_id`}
    //             label="Shift ID"
    //             control={form.control}
    //             render={({ field }) => (
    //               <Input
    //                 {...field}
    //                 value={field.value}
    //                 onChange={field.onChange}
    //                 disabled
    //                 placeholder="Shift ID"
    //                 className="w-[4.5rem]"
    //               />
    //             )}
    //           />
    //           <InputField
    //             name={`working_arrangements.${index}.day`}
    //             label="Day"
    //             primary
    //             control={form.control}
    //             render={({ field }) => (
    //               <InputCombobox
    //                 field={field}
    //                 options={[
    //                   { label: "Monday", value: "Monday" },
    //                   { label: "Tuesday", value: "Tuesday" },
    //                   { label: "Wednesday", value: "Wednesday" },
    //                   { label: "Thursday", value: "Thursday" },
    //                   { label: "Friday", value: "Friday" },
    //                   { label: "Saturday", value: "Saturday" },
    //                   { label: "Sunday", value: "Sunday" },
    //                 ]}
    //                 className="min-w-[9rem]"
    //               />
    //             )}
    //           />
    //           <InputField
    //             name={`working_arrangements.${index}.start_time`}
    //             label="Set Time"
    //             primary
    //             control={form.control}
    //             render={({ field }) => (
    //               <InputTimePicker
    //                 {...field}
    //                 value={field.value}
    //                 onChange={field.onChange}
    //               />
    //             )}
    //           />
    //           <InputField
    //             name={`working_arrangements.${index}.end_time`}
    //             control={form.control}
    //             render={({ field }) => (
    //               <InputTimePicker
    //                 {...field}
    //                 value={field.value}
    //                 onChange={field.onChange}
    //               />
    //             )}
    //           />
    //           <Button
    //             type="button"
    //             variant="outline"
    //             size="icon"
    //             onClick={() => remove(index)}
    //             className="min-w-10"
    //           >
    //             <MinusCircle size={16} />
    //           </Button>
    //         </div>
    //       ))}
    //     </div>
    //     <Button type="submit" className="w-full mt-4 mb-2">
    //       Save
    //     </Button>
    //   </form>
    // </Form>
    <>
      <div className="flex w-full justify-between items-center flex-col md:flex-row gap-2 mt-6">
        <h2 className="font-medium text-sm md:text-base">Pengaturan Kerja</h2>
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
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-medium text-muted-foreground">
                Hari Kerja
              </th>
              <th className="text-left py-2 font-medium text-muted-foreground">
                {viewData?.data?.mapping?.workdays ?? 0}
              </th>
              <th className="text-left py-2 font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {viewData?.data?.mapping?.workarg?.map((shift) => (
              <tr key={shift.shift_id} className="border-b border-gray-100">
                <td className="py-3 pr-4">Shift ID</td>
                <td className="py-3 pr-4 font-medium">{shift.shift_id}</td>
                <td className="py-3">
                  <span className="mr-6">{shift.day}</span> {shift.start_time}-
                  {shift.end_time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WorkingArrangementDetail;
