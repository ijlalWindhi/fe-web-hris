"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputProfile from "@/components/common/input-profile";
import DialogAction from "@/components/common/dialog-action";
import PersonalInformation from "./PersonalInformation";
import ClientIdentification from "./ClientIdentification";
import WorkingArrangement from "./WorkingArrangement";

import useTalentMapping from "@/stores/talent-mapping";
import { CreateTalentMappingSchema } from "../schemas/talent-mapping.schema";
import { useDetailTalentMapping } from "../hooks/useTalentMapping";
import { formatDate } from "@/utils/format-date";

export default function ModalTalent() {
  // variables
  const [file, setFile] = useState<File | null>(null);
  const {
    modalTalentMapping,
    selectedData,
    toggleModalTalentMapping,
    setSelectedData,
  } = useTalentMapping();
  const form = useForm<z.infer<typeof CreateTalentMappingSchema>>({
    resolver: zodResolver(CreateTalentMappingSchema),
    defaultValues: {
      name: "",
      dob: "",
      nik: "",
      email: "",
      phone: "",
      address: "",
      client_id: "",
      outlet_id: "",
      workdays: 0,
    },
  });
  const { data, refetch } = useDetailTalentMapping(
    selectedData?.talend_id ?? "",
  );

  // functions
  const handleClose = () => {
    setSelectedData(null);
    toggleModalTalentMapping(false);
    form.reset();
    setFile(null);
  };

  const onSubmit = async (
    values: z.infer<typeof CreateTalentMappingSchema>,
  ) => {
    console.log(values);
  };

  // lifecycle
  useEffect(() => {
    if (selectedData?.talend_id) {
      refetch();
    }
  }, [selectedData, refetch]);

  useEffect(() => {
    if (data) {
      const initialValue = data?.data;
      form.reset({
        talent_id: initialValue?.talent_id,
        name: initialValue?.name,
        dob: formatDate({
          inputDate: initialValue?.dob ?? "",
          formatFrom: "dd-MM-yyyy",
          formatTo: "dd MMMM yyyy",
        }),
        nik: initialValue?.nik,
        email: initialValue?.email,
        phone: initialValue?.phone,
        address: initialValue?.address,
        client_id: initialValue?.client?.id,
        outlet_id: initialValue?.outlet?.id,
        workdays: Number(initialValue?.workdays ?? 0),
      });
    }
  }, [data, form]);

  return (
    <DialogAction
      isOpen={modalTalentMapping}
      onClose={handleClose}
      title={`${selectedData ? "Edit" : "Register"} Talent`}
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
              <WorkingArrangement />
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
