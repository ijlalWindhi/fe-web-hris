"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight } from "lucide-react";

import { Form } from "@/components/ui/form";
import { InputPassword } from "@/components/common/input-password";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import { useNewPassword } from "../hooks/useNewPassword";
import { NewPasswordSchema } from "../schemas/new-password.schema";

export default function FormNewPassword() {
  // variables
  const router = useRouter();
  const newPassword = useNewPassword();
  const searchParams = useSearchParams();
  const loading = newPassword.isPending;
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      repeat_password: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    try {
      if (values.password !== values.repeat_password) {
        form.setError("repeat_password", {
          type: "manual",
          message: "Password does not match",
        });
        return;
      }

      const data = {
        password: values.password,
        token: searchParams.get("token") || "",
      };

      const res = await newPassword.mutateAsync(data);
      if (res) {
        setModalSuccess({
          open: true,
          title: "Password Reset Successfully!",
          message:
            "Password has been changed successfully. Please log in with your new password to continue.",
          actionVariant: "default",
          actionMessage: "Back to Login",
          action: () => {
            router.push("/auth/login");
          },
        });
      }
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <InputField
          name="password"
          label="Password"
          primary
          control={form.control}
          render={({ field }) => (
            <InputPassword
              placeholder="Enter your password"
              showStrengthIndicator
              {...field}
            />
          )}
        />
        <InputField
          name="repeat_password"
          label="Repeat Password"
          primary
          control={form.control}
          render={({ field }) => (
            <InputPassword
              placeholder="Enter your repeat password"
              {...field}
            />
          )}
        />
        <Button type="submit" className="w-full" loading={loading}>
          Create New Password <ArrowRight size={16} />
        </Button>
      </form>
    </Form>
  );
}
