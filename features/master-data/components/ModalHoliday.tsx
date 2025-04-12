"use client";
import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import InputCombobox from "@/components/common/input-combobox";
import { DatePicker } from "@/components/common/input-date-picket";
import DialogAction from "@/components/common/dialog-action";
import { Button } from "@/components/ui/button";

import useMasterData from "@/stores/master-data";
import useTheme from "@/stores/theme";
import {
  useCreateMasterHoliday,
  useUpdateMasterHoliday,
} from "../hooks/useMasterData";
import { MasterDataSchema } from "../schemas/master-data.schema";
import { formatDate } from "@/utils/format-date";

export default function ModalHoliday() {
  // variables
  const {
    modalMasterHoliday,
    selectedData,
    setSelectedData,
    toggleModalMasterHoliday,
  } = useMasterData();
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof MasterDataSchema>>({
    resolver: zodResolver(MasterDataSchema),
    defaultValues: {
      date: "",
      month: "",
      notes: "",
    },
  });
  const createHoliday = useCreateMasterHoliday();
  const updateHoliday = useUpdateMasterHoliday();

  // functions
  const handleClose = () => {
    try {
      toggleModalMasterHoliday(false);
      setSelectedData(null);
      form.reset();
    } catch (error) {
      console.error("Error from handleClose: ", error);
    }
  };

  const handleSubmit = async (data: z.infer<typeof MasterDataSchema>) => {
    try {
      if (selectedData) {
        const res = await updateHoliday.mutateAsync({
          id: selectedData.id,
          data: {
            name: "-",
            date: formatDate({
              inputDate: data.date,
              formatFrom: "dd MMMM yyyy",
              formatTo: "yyyy-MM-dd",
            }),
            note: data.notes,
            is_national: true,
          },
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Holiday Calendar Successfully Updated",
            message:
              "The holiday calendar information has been updated and saved successfully.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      } else {
        const res = await createHoliday.mutateAsync({
          name: "-",
          date: formatDate({
            inputDate: data.date,
            formatFrom: "dd MMMM yyyy",
            formatTo: "yyyy-MM-dd",
          }),
          note: data.notes,
          is_national: true,
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Holiday Calendar Successfully Registered",
            message:
              "The holiday calendar information has been added to the system.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      }
      handleClose();
    } catch (error) {
      console.error("Error from handleSubmit: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (selectedData) {
      form.setValue(
        "date",
        formatDate({
          inputDate: selectedData.date,
          formatFrom: "yyyy-MM-dd",
          formatTo: "dd MMMM yyyy",
        }),
      );
      form.setValue("month", selectedData.date?.split("-")[1]);
      form.setValue("notes", selectedData.note);
    }
  }, [selectedData, form]);

  return (
    <DialogAction
      isOpen={modalMasterHoliday}
      onClose={() => handleClose()}
      title={`${selectedData ? "Edit" : "Add"} Holiday Calendar`}
      className="max-w-full md:max-w-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <InputField
            name="date"
            label="Date"
            primary
            control={form.control}
            render={({ field }) => (
              <DatePicker
                placeholder="Choose date"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <InputField
            name="month"
            label="Month"
            primary
            control={form.control}
            render={({ field }) => (
              <InputCombobox
                field={field}
                options={[
                  { label: "January", value: "01" },
                  { label: "February", value: "02" },
                  { label: "March", value: "03" },
                  { label: "April", value: "04" },
                  { label: "May", value: "05" },
                  { label: "June", value: "06" },
                  { label: "July", value: "07" },
                  { label: "August", value: "08" },
                  { label: "September", value: "09" },
                  { label: "October", value: "10" },
                  { label: "November", value: "11" },
                  { label: "December", value: "12" },
                ]}
                placeholder="Select month"
              />
            )}
          />
          <InputField
            name="notes"
            label="Notes"
            primary
            control={form.control}
            render={({ field }) => (
              <Input placeholder="e.g. New Year's Day" {...field} />
            )}
          />
          <Button
            type="submit"
            className="w-full"
            loading={createHoliday.isPending}
          >
            Save
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
