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
const PersonalInformation = dynamic(() => import("./PersonalInformation"));
const ClientIdentification = dynamic(() => import("./ClientIdentification"));
const WorkingArrangement = dynamic(() => import("./WorkingArrangement"));

import useTalentMapping from "@/stores/talent-mapping";
import { CreateTalentMappingSchema } from "../schemas/talent-mapping.schema";
import DialogAction from "@/components/common/dialog-action";

export default function ModalTalent() {
  // variables
  const {
    modalTalentMapping,
    selectedId,
    toggleModalTalentMapping,
    setSelectedId,
  } = useTalentMapping();
  const form = useForm<z.infer<typeof CreateTalentMappingSchema>>({
    resolver: zodResolver(CreateTalentMappingSchema),
    defaultValues: {
      email: "",
      address: "",
      client_name: "",
      date_of_birth: "",
      end_time: "00:00",
      id_number: "",
      outlet_mapping: "",
      phone_number: "",
      start_time: "00:00",
      shift_id: "",
      workdays: 0,
    },
  });

  // functions
  const handleClose = () => {
    setSelectedId(null);
    toggleModalTalentMapping(false);
  };

  const onSubmit = async (
    values: z.infer<typeof CreateTalentMappingSchema>,
  ) => {
    console.log(values);
  };

  return (
    <DialogAction
      isOpen={modalTalentMapping}
      onClose={handleClose}
      title={`${selectedId ? "Edit" : "Register"} Talent`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputProfile
            width="w-16 md:w-20"
            height="h-16 md:h-20"
            onFileChange={(file) => console.log(file)}
          />
          <Tabs defaultValue="personal_information" className="min-w-full mt-2">
            <TabsList className="w-full">
              <TabsTrigger value="personal_information">
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="client_identification">
                Client Identification
              </TabsTrigger>
              <TabsTrigger value="working_arrangement">
                Working Arrangement
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal_information">
              <PersonalInformation form={form} />
            </TabsContent>
            <TabsContent value="client_identification">
              <ClientIdentification form={form} />
            </TabsContent>
            <TabsContent value="working_arrangement">
              <WorkingArrangement form={form} />
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
