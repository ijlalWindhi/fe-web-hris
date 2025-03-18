"use client";
import React, { useState } from "react";
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
import { CreateMasterClientSchema } from "../schemas/master-client.schema";
import {
  useCreateMasterClient,
  useUpdateMasterClient,
} from "../hooks/useMasterClient";
import { uploadFile } from "@/services/file";
import { TPayloadMasterClient } from "@/types";

export default function ModalTalent() {
  // variables
  const [file, setFile] = useState<File | null>(null);
  const {
    modalMasterClient,
    selectedData,
    toggleModalMasterClient,
    setSelectedData,
  } = useMasterClient();
  const createMasterClient = useCreateMasterClient();
  const updateMasterClient = useUpdateMasterClient();
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
          name: "",
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
  };

  const onSubmit = async (values: z.infer<typeof CreateMasterClientSchema>) => {
    try {
      const payload: TPayloadMasterClient = {
        ...values,
        photo: "",
        outlet: values.outlet.map((item) => ({
          ...item,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        })),
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
      };

      if (file) {
        const response = await uploadFile(file);
        payload.photo = response;
      } else {
        payload.photo = selectedData?.photo ?? "";
      }

      if (selectedData) {
        await updateMasterClient.mutateAsync({
          id: selectedData.id,
          data: payload,
        });
      } else {
        await createMasterClient.mutateAsync(payload);
      }

      handleClose();
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    } finally {
      handleClose();
    }
  };

  return (
    <DialogAction
      isOpen={modalMasterClient}
      onClose={handleClose}
      title={`${selectedData ? "Edit" : "Register"} Client`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6">
          <InputProfile
            width="w-16 md:w-20"
            height="h-16 md:h-20"
            onFileChange={(file) => setFile(file)}
            defaultImage={selectedData?.photo}
          />
          <Tabs defaultValue="client_information" className="min-w-full mt-2">
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
          <Button type="submit" className="mt-4 w-full">
            Save
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
