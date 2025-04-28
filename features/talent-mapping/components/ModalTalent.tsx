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
import ContractManagement from "./ContractManagement";

import useTalentMapping from "@/stores/talent-mapping";
import useTheme from "@/stores/theme";
import useAuth from "@/stores/auth";
import { createTalentMappingSchema } from "../schemas/talent-mapping.schema";
import {
  useDetailTalentMapping,
  useCreateTalentMapping,
  useUpdateTalentMapping,
  useHistoryTalentMapping,
} from "../hooks/useTalentMapping";
import { formatDate } from "@/utils/format-date";
import { uploadFile } from "@/services/file";
import { TPayloadTalentMapping } from "@/types";
import { fieldToTabMapping } from "@/constants/talent-mapping";
import { hasPermission } from "@/utils/get-permission";

export default function ModalTalent() {
  // variables
  const [file, setFile] = useState<File | null>(null);
  const [fileContract, setFileContract] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("personal_information");
  const {
    modalTalentMapping,
    selectedData,
    toggleModalTalentMapping,
    setSelectedData,
    fetchOptionsClient,
    fetchOptionsOutlet,
  } = useTalentMapping();
  const { setModalSuccess } = useTheme();
  const { profile } = useAuth();
  const roleId = profile?.role?.id || 0;
  const CreateTalentMappingSchema = createTalentMappingSchema(roleId);
  const form = useForm<z.infer<typeof CreateTalentMappingSchema>>({
    resolver: zodResolver(CreateTalentMappingSchema),
    defaultValues: {
      name: "",
      dob: "",
      nik: "",
      email: "",
      phone: "",
      address: "",
      bpjs_number: "",
      ptkp: "",
      npwp: "",
      bank_account_name: "",
      bank_account_number: "",
      type_tad: "",
      gender: "",
      client_id: "",
      outlet_id: "",
      contract_start_date: "",
      contract_end_date: "",
      current_salary: 0,
      resign_date: "",
    },
  });
  const { data, refetch } = useDetailTalentMapping(
    selectedData?.talend_id ?? "",
  );
  const { refetch: refetchHistory } = useHistoryTalentMapping(
    selectedData?.talend_id ?? "",
  );
  const createTalentMapping = useCreateTalentMapping();
  const updateTalentMapping = useUpdateTalentMapping();

  // functions
  const handleClose = () => {
    setSelectedData(null);
    toggleModalTalentMapping(false);
    form.reset();
    setFile(null);
    setFileContract(null);
    setActiveTab("personal_information");
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

    return "personal_information";
  };

  const onSubmit = async (
    values: z.infer<typeof CreateTalentMappingSchema>,
  ) => {
    try {
      const payload: TPayloadTalentMapping = {
        photo: "",
        name: values.name,
        dob: formatDate({
          inputDate: values.dob,
          formatFrom: "dd MMMM yyyy",
          formatTo: "dd-MM-yyyy",
        }),
        nik: values.nik,
        email: values.email,
        phone: values.phone,
        address: values.address,
        bpjs_number: values.bpjs_number,
        bank_account_name: values.bank_account_name,
        bank_account_number: values.bank_account_number,
        ptkp: Number(values.ptkp || 0),
        npwp: values.npwp,
        type_tad: Number(values.type_tad || 0),
        gender: Number(values.gender || 0),
        client_id: Number(values.client_name),
        outlet_id: Number(values.outlet_mapping),
        contract: {
          start_date: values.contract_start_date
            ? formatDate({
                inputDate: values.contract_start_date,
                formatFrom: "dd MMMM yyyy",
                formatTo: "dd-MM-yyyy",
              })
            : "",
          end_date: values.contract_end_date
            ? formatDate({
                inputDate: values.contract_end_date,
                formatFrom: "dd MMMM yyyy",
                formatTo: "dd-MM-yyyy",
              })
            : "",
          file: "",
          current_salary: values.current_salary,
          resign_date: values.resign_date
            ? formatDate({
                inputDate: values.resign_date,
                formatFrom: "dd MMMM yyyy",
                formatTo: "dd-MM-yyyy",
              })
            : "",
        },
      };
      if (file) {
        const response = await uploadFile(file);
        payload.photo = response;
      } else {
        payload.photo = selectedData?.photo ?? "";
      }
      if (fileContract) {
        const response = await uploadFile(fileContract);
        if (payload.contract) {
          payload.contract.file = response;
        }
      } else {
        if (payload.contract) {
          if (payload.contract) {
            payload.contract.file = data?.data?.contract?.file ?? "";
          }
        }
      }
      if (selectedData) {
        const res = await updateTalentMapping.mutateAsync({
          id: selectedData.talend_id,
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
              handleClose();
            },
            animation: "success",
          });
        }
      } else {
        const res = await createTalentMapping.mutateAsync(payload);
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "TAD Successfully Registered!",
            message: "The TAD's information has been added to the system. ",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      }
      toggleModalTalentMapping(false);
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  const getData = async () => {
    try {
      const initialValue = data?.data;
      form.reset({
        talent_id: initialValue?.talent_id,
        name: initialValue?.name,
        dob: initialValue?.dob
          ? formatDate({
              inputDate: initialValue?.dob ?? "",
              formatFrom: "dd-MM-yyyy",
              formatTo: "dd MMMM yyyy",
            })
          : undefined,
        nik: initialValue?.nik,
        email: initialValue?.email,
        phone: initialValue?.phone,
        address: initialValue?.address,
        bpjs_number: initialValue?.bpjs_number,
        bank_account_name: initialValue?.bank_account_name,
        bank_account_number: initialValue?.bank_account_number,
        ptkp: initialValue?.ptkp?.toString(),
        npwp: initialValue?.npwp,
        type_tad: initialValue?.type_tad?.toString(),
        gender: initialValue?.gender?.toString(),
        client_id: initialValue?.client?.id,
        outlet_mapping: initialValue?.outlet?.id,
        contract_start_date: initialValue?.contract?.start_date
          ? formatDate({
              inputDate: initialValue?.contract?.start_date ?? "",
              formatFrom: "dd-MM-yyyy",
              formatTo: "dd MMMM yyyy",
            })
          : undefined,
        contract_end_date: initialValue?.contract?.end_date
          ? formatDate({
              inputDate: initialValue?.contract?.end_date ?? "",
              formatFrom: "dd-MM-yyyy",
              formatTo: "dd MMMM yyyy",
            })
          : undefined,
        current_salary: initialValue?.contract?.current_salary || 0,
        resign_date: initialValue?.contract?.resign_date
          ? formatDate({
              inputDate: initialValue?.contract?.resign_date ?? "",
              formatFrom: "dd-MM-yyyy",
              formatTo: "dd MMMM yyyy",
            })
          : undefined,
      });
      const resClientOptions = await fetchOptionsClient();
      const resOutletOptions = await fetchOptionsOutlet(
        initialValue?.client?.id?.toString() ?? "",
      );
      const client = resClientOptions?.find(
        (item) => item.id?.toString() === initialValue?.client?.id?.toString(),
      );
      const outlet = resOutletOptions?.find(
        (item) => item.id?.toString() === initialValue?.outlet?.id?.toString(),
      );
      if (client) {
        form.setValue("client_name", client.id?.toString() ?? "");
        form.setValue("client_id", client.id_client ?? "");
        form.setValue("client_address", client.address ?? "");
      }
      if (outlet) {
        form.setValue("outlet_mapping", outlet.id?.toString());
        form.setValue("outlet_id", outlet.outlet_id ?? "");
        form.setValue("outlet_address", outlet.address ?? "");
        form.setValue("outlet_lat", outlet.latitude?.toString() ?? "");
        form.setValue("outlet_long", outlet.longitude?.toString() ?? "");
      }
    } catch (error) {
      console.error("Error from getData: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (selectedData?.talend_id) {
      refetch();
      refetchHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData, refetch]);

  useEffect(() => {
    if (data && selectedData?.talend_id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (modalTalentMapping && !selectedData) {
      fetchOptionsClient();
      form.setValue("talent_id", "");
      form.setValue("name", "");
      form.setValue("dob", "");
      form.setValue("nik", "");
      form.setValue("email", "");
      form.setValue("phone", "");
      form.setValue("address", "");
      form.setValue("client_name", "");
      form.setValue("client_id", "");
      form.setValue("client_address", "");
      form.setValue("outlet_mapping", "");
      form.setValue("outlet_id", "");
      form.setValue("outlet_address", "");
      form.setValue("outlet_lat", "");
      form.setValue("outlet_long", "");
      form.setValue("contract_start_date", "");
      form.setValue("contract_end_date", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalTalentMapping]);

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
      isOpen={modalTalentMapping}
      onClose={handleClose}
      title={`${selectedData ? "Edit" : "Register"} TAD`}
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
              <TabsTrigger value="personal_information">
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="client_identification">
                Client Identification
              </TabsTrigger>
              <TabsTrigger value="working_arrangement">
                Working Arrangement
              </TabsTrigger>
              {hasPermission("Talent Mapping", "add contract") && (
                <TabsTrigger value="contract_management">
                  Contract Management
                </TabsTrigger>
              )}
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
            <TabsContent value="contract_management">
              <ContractManagement
                form={form}
                setFileContract={setFileContract}
              />
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
