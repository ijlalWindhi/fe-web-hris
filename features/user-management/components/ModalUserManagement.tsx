"use client";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import InputProfile from "@/components/common/input-profile";
import DialogAction from "@/components/common/dialog-action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputCombobox from "@/components/common/input-combobox";

import useUserManagement from "@/stores/user-management";
import useTheme from "@/stores/theme";
import { CreateUserManagementSchema } from "../schemas/user-management.schema";
import {
  useCreateUserManagement,
  useUpdateUserManagement,
} from "../hooks/useUserManagement";
import { useOptionMasterClient } from "@/features/master-client/hooks/useMasterClient";
import { useRoleOptions } from "@/features/role-management/hooks/useRoleManagement";
import { uploadFile } from "@/services/file";
import { TPayloadUserManagement } from "@/types";

export default function ModalTalent() {
  // variables
  const [file, setFile] = useState<File | null>(null);
  const {
    modalUserManagement,
    selectedData,
    toggleModalUserManagement,
    setSelectedData,
  } = useUserManagement();
  const { setModalSuccess } = useTheme();
  const createUserManagement = useCreateUserManagement();
  const updateUserManagement = useUpdateUserManagement();
  const { data: optionsRole } = useRoleOptions();
  const { data: optionsClient } = useOptionMasterClient();
  const form = useForm<z.infer<typeof CreateUserManagementSchema>>({
    resolver: zodResolver(CreateUserManagementSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role_id: "",
      address: "",
      client_id: "",
    },
  });

  // functions
  const handleClose = () => {
    setSelectedData(null);
    toggleModalUserManagement(false);
    form.reset();
    setFile(null);
  };

  const onSubmit = async (
    values: z.infer<typeof CreateUserManagementSchema>,
  ) => {
    try {
      const payload: TPayloadUserManagement = {
        ...values,
        photo: "",
        role_id: parseInt(values.role_id),
        client_id: values.client_id ? parseInt(values.client_id) : null,
        status: true,
      };
      if (file) {
        const response = await uploadFile(file);
        payload.photo = response;
      } else {
        payload.photo = selectedData?.photo ?? "";
      }
      if (selectedData) {
        const res = await updateUserManagement.mutateAsync({
          id: selectedData?.id_user,
          data: payload,
        });
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "User Updated",
            message:
              "The User's information has been updated and saved successfully.",
            actionVariant: "default",
            actionMessage: "Back",
            action: () => {
              handleClose();
            },
            animation: "success",
          });
        }
      } else {
        const res = await createUserManagement.mutateAsync(payload);
        if (res.status === "success") {
          setModalSuccess({
            open: true,
            title: "User Created",
            message:
              "The User's information has been created and saved successfully.",
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
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (selectedData) {
      form.reset({
        name: selectedData.name,
        email: selectedData.email,
        phone: selectedData.phone,
        role_id: selectedData.role.id.toString(),
        client_id: selectedData.client?.id?.toString(),
        address: selectedData.address,
      });
    }
  }, [selectedData, form]);

  return (
    <DialogAction
      isOpen={modalUserManagement}
      onClose={handleClose}
      title={`${selectedData ? "Edit" : "Register"} User`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6">
          <div className="space-y-2 px-2 max-h-[60vh] overflow-y-auto">
            <InputProfile
              width="w-16 md:w-20"
              height="h-16 md:h-20"
              onFileChange={(file) => setFile(file)}
              defaultImage={selectedData?.photo}
            />
            <InputField
              name="name"
              label="Name"
              primary
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="e.g. Dhisa" />
              )}
            />
            <InputField
              name="email"
              label="Email Address"
              primary
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="e.g. dhisa@mail.com" />
              )}
            />
            <InputField
              name="phone"
              label="Number Phone"
              primary
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="e.g. 081234567890" />
              )}
            />
            <InputField
              name="role_id"
              label="Role"
              primary
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value || selectedData?.role.id.toString()}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full rounded-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pilih Role</SelectLabel>
                      {optionsRole?.data?.map((item) => (
                        <SelectItem
                          className="capitalize"
                          key={item.id}
                          value={item.id.toString()}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <InputField
              name="client_id"
              label="Client Name"
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
              name="address"
              label="Address"
              primary
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="e.g. Jakarta" />
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-4 w-full"
            loading={
              createUserManagement.isPending || updateUserManagement.isPending
            }
          >
            Save
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
