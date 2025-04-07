"use client";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputProfile from "@/components/common/input-profile";
import DialogAction from "@/components/common/dialog-action";
import ClientInformation from "./ClientInformation";
import OutletList from "./OutletList";
import Payroll from "./Payroll";

import useMasterClient from "@/stores/master-client";
import useTheme from "@/stores/theme";
import { CreateMasterClientSchema } from "../schemas/master-client.schema";
import {
  useCreateMasterClient,
  useUpdateMasterClient,
  useDetailMasterClient,
} from "../hooks/useMasterClient";
import { uploadFile } from "@/services/file";
import { TPayloadMasterClient } from "@/types";
import { formatDate } from "@/utils/format-date";
import { fieldToTabMapping } from "@/constants/master-client";

export default function ModalTalent() {
  // variables
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("client_information");
  const {
    modalMasterClient,
    selectedData,
    toggleModalMasterClient,
    setSelectedData,
  } = useMasterClient();
  const { setModalSuccess } = useTheme();
  const createMasterClient = useCreateMasterClient();
  const updateMasterClient = useUpdateMasterClient();
  const { data: detailData, refetch } = useDetailMasterClient(
    selectedData?.id ?? "",
  );
  const form = useForm<z.infer<typeof CreateMasterClientSchema>>({
    resolver: zodResolver(CreateMasterClientSchema),
    defaultValues: {
      name: "",
      address: "",
      cs_person: "",
      cs_number: "",
      cs_email: "",
      outlet: [],
      basic_salary: 0,
      agency_fee: 0,
      bpjs: [
        {
          name: "Jaminan Hari Tua(JHT)",
          amount: 0,
        },
        {
          name: "Jaminan Kecelakaan Kerja(JKK)",
          amount: 0,
        },
        {
          name: "Jaminan Kematian(JKM)",
          amount: 0,
        },
        {
          name: "Jaminan Pensiun(JP)",
          amount: 0,
        },
        {
          name: "Jaminan Kehilangan Pekerjaan(JKP)",
          amount: 0,
        },
        {
          name: "Jaminan Kesehatan(BPJS)",
          amount: 0,
        },
      ],
      allowences: [
        {
          name: "",
          amount: 0,
        },
      ],
      payment_date: "",
    },
  });

  // functions
  const handleClose = () => {
    setSelectedData(null);
    toggleModalMasterClient(false);
    form.reset();
    setFile(null);
    setActiveTab("client_information");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findTabWithError = (errors: any): string => {
    const errorFields = Object.keys(errors);
    for (const field of errorFields) {
      const correspondingTab = fieldToTabMapping[field];
      if (correspondingTab) {
        return correspondingTab;
      }
    }

    return "client_information";
  };

  const onSubmit = async (values: z.infer<typeof CreateMasterClientSchema>) => {
    try {
      const modifiedOutlets = values.outlet.map((outletItem) => {
        if (selectedData) {
          const existingOutlet = detailData?.data?.outlet?.find(
            (existing) => existing.id_outlet === outletItem.id_outlet,
          );

          if (existingOutlet) {
            return {
              ...outletItem,
              id_outlet: existingOutlet.id_outlet,
              latitude: parseFloat(outletItem.latitude),
              longitude: parseFloat(outletItem.longitude),
            };
          }
        }

        return {
          ...outletItem,
          latitude: parseFloat(outletItem.latitude),
          longitude: parseFloat(outletItem.longitude),
        };
      });

      const payload: TPayloadMasterClient = {
        ...values,
        photo: "",
        outlet: modifiedOutlets,
        basic_salary: values.basic_salary,
        agency_fee: values.agency_fee,
        bpjs: values.bpjs.map((item) => ({
          ...item,
          amount: item.amount,
        })),
        allowences: values.allowences.map((item) => ({
          ...item,
          amount: item.amount,
        })),
        payment_date: formatDate({
          inputDate: values.payment_date,
          formatFrom: "dd MMMM yyyy",
          formatTo: "dd-MM-yyyy",
        }),
      };

      if (file) {
        const response = await uploadFile(file);
        payload.photo = response;
      } else {
        payload.photo = selectedData?.photo ?? "";
      }

      if (selectedData) {
        const res = await updateMasterClient.mutateAsync({
          id: selectedData.id,
          data: payload,
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Master Client Updated",
            message:
              "The Master Client's information has been updated and saved successfully.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      } else {
        const res = await createMasterClient.mutateAsync(payload);
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "Master Client Created",
            message:
              "The Master Client's information has been created and saved successfully.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (selectedData?.id) {
      refetch();
    }
  }, [selectedData?.id, refetch]);

  useEffect(() => {
    if (detailData) {
      const data = detailData.data;
      const formattedData = {
        ...data,
        outlet:
          data?.outlet?.map((item) => ({
            ...item,
            id_outlet: item.id_outlet ?? "",
            latitude: item.latitude.toString() ?? "",
            longitude: item.longitude.toString() ?? "",
          })) ?? [],
        basic_salary: Number(data?.basic_salary ?? 0),
        agency_fee: Number(data?.agency_fee ?? 0),
        bpjs:
          data?.bpjs?.map((item) => ({
            ...item,
            amount: Number(item.amount ?? 0),
          })) ?? [],
        allowences:
          data?.allowences?.map((item) => ({
            ...item,
            amount: Number(item.amount ?? 0),
          })) ?? [],
        payment_date: data?.payment_date
          ? formatDate({
              inputDate: data?.payment_date ?? "",
              formatFrom: "dd-MM-yyyy",
              formatTo: "dd MMMM yyyy",
            })
          : "",
      };
      form.reset(formattedData);
    }
  }, [detailData, form]);

  useEffect(() => {
    const subscription = form.formState.isSubmitSuccessful
      ? undefined
      : form.watch(() => {
          const errors = form.formState.errors;
          if (Object.keys(errors).length > 0) {
            const tabWithError = findTabWithError(errors);
            setActiveTab(tabWithError);
          }
        });

    return () => subscription?.unsubscribe();
  }, [form, form.formState, form.watch]);

  return (
    <DialogAction
      isOpen={modalMasterClient}
      onClose={handleClose}
      title={`${selectedData ? "Edit" : "Register"} Client`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            const tabWithError = findTabWithError(errors);
            setActiveTab(tabWithError);
          })}
          className="pt-6"
        >
          <InputProfile
            width="w-16 md:w-20"
            height="h-16 md:h-20"
            onFileChange={(file) => setFile(file)}
            defaultImage={selectedData?.photo}
          />
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="min-w-full mt-2"
          >
            <TabsList className="w-full">
              <TabsTrigger value="client_information">
                Client Information
              </TabsTrigger>
              <TabsTrigger value="outlet_list">Outlet List</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
            </TabsList>
            <TabsContent value="client_information">
              <ClientInformation form={form} />
            </TabsContent>
            <TabsContent value="outlet_list">
              <OutletList form={form} />
            </TabsContent>
            <TabsContent value="payroll">
              <Payroll form={form} />
            </TabsContent>
          </Tabs>
          <Button
            type="submit"
            className="mt-4 w-full"
            loading={
              createMasterClient.isPending || updateMasterClient.isPending
            }
          >
            Save Data
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
