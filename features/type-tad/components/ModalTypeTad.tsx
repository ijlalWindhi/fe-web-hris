"use client";
import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import InputCombobox from "@/components/common/input-combobox";
import DialogAction from "@/components/common/dialog-action";
import { Button } from "@/components/ui/button";
import { InputCurrency } from "@/components/common/input-currency";

import useTypeTad from "@/stores/type-tad";
import useTheme from "@/stores/theme";
import { useCreateTypeTad, useUpdateTypeTad } from "../hooks/useTypeTad";
import { useOptionMasterClient } from "@/features/master-client/hooks/useMasterClient";
import { TypeTadSchema } from "../schemas/type-tad.schema";

export default function ModalTypeTad() {
  // variables
  const { modalTypeTad, selectedData, setSelectedData, toggleModalTypeTad } =
    useTypeTad();
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof TypeTadSchema>>({
    resolver: zodResolver(TypeTadSchema),
    defaultValues: {
      id_client: "",
      type_tad: "",
      type_employee: "",
      positional_allowance: 0,
    },
  });
  const createTypeTad = useCreateTypeTad();
  const updateTypeTad = useUpdateTypeTad();
  const { data: optionsClient } = useOptionMasterClient();

  // functions
  const handleClose = () => {
    try {
      toggleModalTypeTad(false);
      setSelectedData(null);
      form.reset();
    } catch (error) {
      console.error("Error from handleClose: ", error);
    }
  };

  const handleSubmit = async (data: z.infer<typeof TypeTadSchema>) => {
    try {
      if (selectedData) {
        const res = await updateTypeTad.mutateAsync({
          id: selectedData.code,
          data: {
            ...data,
            code: selectedData.code,
            id_client: Number(data.id_client || 0),
          },
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Type TAD Updated",
            message:
              "The type TAD information has been updated and saved successfully.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      } else {
        const res = await createTypeTad.mutateAsync({
          ...data,
          id_client: Number(data.id_client || 0),
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Type TAD Successfully Registered",
            message: "The type TAD information has been added to the system.",
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
      form.setValue("id_client", selectedData.id_client?.toString());
      form.setValue("type_tad", selectedData.type_tad);
      form.setValue("type_employee", selectedData.type_employee);
      form.setValue("positional_allowance", selectedData.positional_allowance);
    }
  }, [selectedData, form]);

  return (
    <DialogAction
      isOpen={modalTypeTad}
      onClose={() => handleClose()}
      title={`${selectedData ? "Edit" : "Add"} Payment`}
      className="max-w-full md:max-w-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <div className="py-4 px-1 space-y-4 max-h-[50vh] overflow-y-auto">
            <InputField
              name="id_client"
              label="Client Name"
              primary
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsClient?.data?.map((item) => ({
                      value: item.id?.toString(),
                      label: item.name,
                    })) || []
                  }
                  placeholder="Select client"
                />
              )}
            />
            <InputField
              name="type_employee"
              label="Type Employee"
              primary
              control={form.control}
              render={({ field }) => (
                <Input placeholder="e.g. Manager" {...field} />
              )}
            />
            <InputField
              name="type_tad"
              label="Type TAD"
              primary
              control={form.control}
              render={({ field }) => (
                <Input placeholder="e.g. Helper" {...field} />
              )}
            />
            <InputField
              name="positional_allowance"
              label="Positional Allowance"
              primary
              control={form.control}
              render={({ field }) => (
                <InputCurrency
                  placeholder="e.g. 1.000.000"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            loading={createTypeTad.isPending}
          >
            Save
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
