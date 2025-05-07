"use client";
import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import InputCombobox from "@/components/common/input-combobox";
import { DatePicker } from "@/components/common/input-date-picket";
import DialogAction from "@/components/common/dialog-action";
import { Button } from "@/components/ui/button";
import { InputCurrency } from "@/components/common/input-currency";
import RadioButton from "@/components/ui/radio-group";

import useClaimCompensation from "@/stores/claim-compensation";
import useTheme from "@/stores/theme";
import {
  useCreateClaimCompensation,
  useUpdateClaimCompensation,
  useClaimCompensationOptions,
} from "../hooks/useClaimCompensation";
import { useOptionMasterClient } from "@/features/master-client/hooks/useMasterClient";
import { useTalentOptions } from "@/features/talent-mapping/hooks/useTalentMapping";
import { ClaimCompensationSchema } from "../schemas/claim-compensation.schema";
import { formatDate } from "@/utils/format-date";

export default function ModalClaimCompensation() {
  // variables
  const {
    modalClaimCompensation,
    selectedData,
    setSelectedData,
    toggleModalClaimCompensation,
  } = useClaimCompensation();
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof ClaimCompensationSchema>>({
    resolver: zodResolver(ClaimCompensationSchema),
    defaultValues: {
      code_user: "",
      client_id: "",
      service_name: "",
      amount: 0,
      payment_date: "",
      type: "",
      description: "",
      status_payment: "false",
    },
  });
  const createClaimCompensation = useCreateClaimCompensation();
  const updateClaimCompensation = useUpdateClaimCompensation();
  const { data: optionsType } = useClaimCompensationOptions();
  const { data: optionsClient } = useOptionMasterClient();
  const { data: optionsTalent, refetch: refetchTalent } = useTalentOptions({
    client_id: form.watch("client_id"),
  });

  // functions
  const handleClose = () => {
    try {
      toggleModalClaimCompensation(false);
      setSelectedData(null);
      form.reset();
    } catch (error) {
      console.error("Error from handleClose: ", error);
    }
  };

  const handleSubmit = async (
    data: z.infer<typeof ClaimCompensationSchema>,
  ) => {
    try {
      if (selectedData) {
        const res = await updateClaimCompensation.mutateAsync({
          id: selectedData.id,
          data: {
            ...data,
            payment_date: formatDate({
              inputDate: data.payment_date,
              formatFrom: "dd MMMM yyyy",
              formatTo: "yyyy-MM-dd",
            }),
            code_user: data.code_user,
            client_id: Number(data.client_id),
            type: Number(data.type),
            status_payment: data.status_payment === "true",
          },
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Payment Successfully Updated",
            message:
              "The payment information has been updated and saved successfully.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      } else {
        const res = await createClaimCompensation.mutateAsync({
          ...data,
          payment_date: formatDate({
            inputDate: data.payment_date,
            formatFrom: "dd MMMM yyyy",
            formatTo: "yyyy-MM-dd",
          }),
          code_user: data.code_user,
          client_id: Number(data.client_id),
          amount: Number(data.amount),
          type: Number(data.type),
          status_payment: data.status_payment === "true",
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Payment Successfully Registered",
            message: "The payment information has been added to the system.",
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
        "payment_date",
        format(
          parse(selectedData.payment_date, "dd MMMM yyyy", new Date(), {
            locale: id,
          }),
          "dd MMMM yyyy",
        ),
      );
      form.setValue("code_user", selectedData.talent_id?.toString());
      form.setValue("client_id", selectedData.client_id?.toString());
      form.setValue("service_name", selectedData.service_name);
      form.setValue("amount", selectedData.amount);
      form.setValue("type", selectedData.type.id.toString());
      form.setValue("description", selectedData.description);
      form.setValue(
        "status_payment",
        selectedData.status_payment ? "true" : "false",
      );
    }
  }, [selectedData, form]);

  return (
    <DialogAction
      isOpen={modalClaimCompensation}
      onClose={() => handleClose()}
      title={`${selectedData ? "Ubah" : "Tambah"} Klaim & Kompensasi`}
      className="max-w-full md:max-w-lg"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <div className="py-4 px-1 space-y-4 max-h-[50vh] overflow-y-auto">
            <InputField
              name="client_id"
              label="Nama Klien"
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
                  placeholder="Pilih klien"
                  onChange={(value) => {
                    field.onChange(value);
                    refetchTalent();
                  }}
                />
              )}
            />
            <InputField
              name="code_user"
              label="Nama TAD"
              primary
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsTalent?.data?.map((item) => ({
                      value: item.id?.toString(),
                      label: item.name,
                    })) || []
                  }
                  disabled={!form.watch("client_id")}
                  placeholder="Pilih TAD"
                />
              )}
            />
            <InputField
              name="service_name"
              label="Nama Layanan"
              primary
              control={form.control}
              render={({ field }) => (
                <Input placeholder="e.g. Transport" {...field} />
              )}
            />
            <InputField
              name="amount"
              label="Nominal"
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
            <InputField
              name="payment_date"
              label="Tanggal Pembayaran"
              primary
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Pilih tanggal"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <InputField
              name="type"
              label="Tipe"
              primary
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsType?.data?.map((item) => ({
                      value: item.id?.toString(),
                      label: item.name,
                    })) || []
                  }
                  placeholder="Pilih tipe"
                />
              )}
            />
            <InputField
              name="description"
              label="Deskripsi"
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder="e.g. Reimbure transportasi ke kantor pusat"
                  {...field}
                />
              )}
            />
            <InputField
              name="status_payment"
              label="Status Pembayaran"
              control={form.control}
              render={({ field }) => (
                <RadioButton
                  {...field}
                  options={[
                    { label: "Sudah Dibayarkan", value: "true" },
                    { label: "Belum Dibayarkan", value: "false" },
                  ]}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            loading={createClaimCompensation.isPending}
          >
            Simpan
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
