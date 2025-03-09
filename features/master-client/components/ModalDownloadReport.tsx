/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, Plus, Download } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DialogAction from "@/components/common/dialog-action";
import InfiniteCombobox from "@/components/common/input-infinite-select";
import { InputField } from "@/components/common/input-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useMasterClient from "@/stores/master-client";
import { Input } from "@/components/ui/input";

// Update schema untuk mendukung array fields
const DownloadReportSchema = z.object({
  filters: z
    .array(
      z.object({
        item_seen: z.string().min(1, "Item is required"),
        operator: z.enum(["AND", "OR"]).default("AND"),
      }),
    )
    .min(1, "At least one filter is required"),
});

export default function ModalDownloadReport() {
  // variables
  const { modalDownloadReport, toggleModalDownloadReport } = useMasterClient();
  const form = useForm<z.infer<typeof DownloadReportSchema>>({
    resolver: zodResolver(DownloadReportSchema),
    defaultValues: {
      filters: [{ item_seen: "", operator: "AND" }],
    },
  });

  // Setup field array untuk mengelola array fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "filters",
  });

  // functions
  const getOptionItem = async () => {
    return {
      data: [
        {
          id: "Client Address",
          zona: "Client Address",
        },
        {
          id: "Outlet",
          zona: "Outlet",
        },
        {
          id: "Select item",
          zona: "Select item",
        },
      ],
      total: 3,
    } as any;
  };

  // Function untuk menambah field baru
  const handleAddField = () => {
    append({ item_seen: "", operator: fields.length > 0 ? "AND" : "AND" });
  };

  // Function untuk menghapus field
  const handleRemoveField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (values: z.infer<typeof DownloadReportSchema>) => {
    try {
      // Transform data menjadi format yang diinginkan API
      const transformedData = {
        item_seen: values.filters.map((filter) => filter.item_seen),
        operator:
          values.filters.length > 1 ? values.filters[1].operator : "AND",
      };

      console.log("Original form values:", values);
      console.log("Transformed data for API:", transformedData);
      toggleModalDownloadReport(false);
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  return (
    <DialogAction
      isOpen={modalDownloadReport}
      onClose={() => toggleModalDownloadReport(false)}
      title={"Download Report"}
      className="max-w-full md:max-w-xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <div className="flex w-full justify-between items-end gap-2 flex-col md:flex-row">
                <InputField
                  name={`filters.${index}.operator`}
                  control={form.control}
                  className="w-full"
                  render={({ field }) => (
                    <Input {...field} placeholder="Operator" disabled />
                  )}
                />
                <div className="w-full">
                  <InputField
                    name={`filters.${index}.item_seen`}
                    label={"Item Seen"}
                    primary
                    control={form.control}
                    render={({ field }) => (
                      <InfiniteCombobox
                        value={field.value}
                        defaultValue={""}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        onClear={() => field.onChange("")}
                        fetchData={() => getOptionItem()}
                        valueKey="id"
                        labelKey="zona"
                        pageSize={10}
                        placeholder="Select item"
                        className="w-full"
                      />
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant={"outline"}
                  size="icon"
                  className="w-20"
                  onClick={() => handleRemoveField(index)}
                  disabled={fields.length <= 1}
                >
                  <MinusCircle size={16} />
                </Button>
              </div>
            </div>
          ))}

          <div
            className="flex gap-2 items-center my-4 w-fit text-primary text-sm cursor-pointer"
            onClick={handleAddField}
          >
            <Plus size={16} />
            <p>Tambah Data</p>
          </div>

          <Button type="submit" className="w-full">
            <Download size={16} className="mr-2" />
            Download Report
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
