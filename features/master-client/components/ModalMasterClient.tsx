"use client";
import React from "react";
import dynamic from "next/dynamic";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputProfile from "@/components/common/input-profile";
import DialogAction from "@/components/common/dialog-action";
const ClientInformation = dynamic(() => import("./ClientInformation"));
const OutletList = dynamic(() => import("./OutletList"));
const Payroll = dynamic(() => import("./Payroll"));

import useMasterClient from "@/stores/master-client";
import { CreateMasterClientSchema } from "../schemas/master-client.schema";

export default function ModalTalent() {
  // variables
  const {
    modalMasterClient,
    selectedId,
    toggleModalMasterClient,
    setSelectedId,
  } = useMasterClient();
  const form = useForm<z.infer<typeof CreateMasterClientSchema>>({
    resolver: zodResolver(CreateMasterClientSchema),
    defaultValues: {
      basic_salary: "",
      agency_fee: "",
      outlet: [],
      payroll_basic_salary: "",
      payroll_agency_fee: "",
      bpjs_deduction: [],
      payment_due_date: "",
    },
  });

  // functions
  const handleClose = () => {
    setSelectedId(null);
    toggleModalMasterClient(false);
  };

  const onSubmit = async (values: z.infer<typeof CreateMasterClientSchema>) => {
    console.log(values);
  };

  return (
    <DialogAction
      isOpen={modalMasterClient}
      onClose={handleClose}
      title={`${selectedId ? "Edit" : "Register"} Client`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6">
          <InputProfile
            width="w-16 md:w-20"
            height="h-16 md:h-20"
            onFileChange={(file) => console.log(file)}
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
