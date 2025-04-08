"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight } from "lucide-react";

import { Form } from "@/components/ui/form";
import { InputPassword } from "@/components/common/input-password";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import { useFirstLogin } from "../hooks/useFirstLogin";
import { FirstLoginSchema } from "../schemas/first-login.schema";

export default function FormFirstLogin() {
  // variables
  const router = useRouter();
  const firstLogin = useFirstLogin();
  const loading = firstLogin.isPending;
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof FirstLoginSchema>>({
    resolver: zodResolver(FirstLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof FirstLoginSchema>) => {
    try {
      if (values.password !== values.confirm_password) {
        form.setError("confirm_password", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      const data = {
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      };

      const res = await firstLogin.mutateAsync(data);
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
          name="email"
          label="Email"
          primary
          control={form.control}
          render={({ field }) => (
            <Input placeholder="Enter your email" {...field} />
          )}
        />
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
          name="confirm_password"
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
