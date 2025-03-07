"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import InputProfile from "@/components/common/input-profile";
import DialogAction from "@/components/common/dialog-action";

import useUserManagement from "@/stores/user-management";
import { CreateUserManagementSchema } from "../schemas/user-management.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModalTalent() {
  // variables
  const {
    modalUserManagement,
    selectedId,
    toggleModalUserManagement,
    setSelectedId,
  } = useUserManagement();
  const form = useForm<z.infer<typeof CreateUserManagementSchema>>({
    resolver: zodResolver(CreateUserManagementSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      role: "admin",
      address: "",
    },
  });

  // functions
  const handleClose = () => {
    setSelectedId(null);
    toggleModalUserManagement(false);
  };

  const onSubmit = async (
    values: z.infer<typeof CreateUserManagementSchema>,
  ) => {
    console.log(values);
  };

  return (
    <DialogAction
      isOpen={modalUserManagement}
      onClose={handleClose}
      title={`${selectedId ? "Edit" : "Register"} User`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-6 space-y-2">
          <InputProfile
            width="w-16 md:w-20"
            height="h-16 md:h-20"
            onFileChange={(file) => console.log(file)}
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
            name="phone_number"
            label="Number Phone"
            primary
            control={form.control}
            render={({ field }) => (
              <Input {...field} placeholder="e.g. 081234567890" />
            )}
          />
          <InputField
            name="role"
            label="Role"
            primary
            control={form.control}
            render={({ field }) => (
              <Select defaultValue={field.value}>
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pilih Role</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
          <Button type="submit" className="mt-4 w-full">
            Save
          </Button>
        </form>
      </Form>
    </DialogAction>
  );
}
