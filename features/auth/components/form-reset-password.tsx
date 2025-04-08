"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import { useResetPassword } from "../hooks/useResetPassword";
import { ResetPasswordSchema } from "../schemas/reset-password.schema";

export default function FormResetPassword() {
  // variables
  const router = useRouter();
  const resetPassword = useResetPassword();
  const loading = resetPassword.isPending;
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    try {
      const res = await resetPassword.mutateAsync(values);
      if (res) {
        setModalSuccess({
          open: true,
          title: "Check Your Email!",
          message:
            "We have sent a password reset link to your email. Open the email to reset your password.",
          actionVariant: "default",
          actionMessage: "Open Email",
          action: () => {
            window.open("https://mail.google.com/mail/u/0/#inbox");
            router.push("/auth/new-password");
          },
          animation: "email",
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
          label="Email Address"
          primary
          control={form.control}
          render={({ field }) => (
            <Input
              type="email"
              placeholder="Enter your email address"
              icon={Mail}
              {...field}
            />
          )}
        />
        <Button type="submit" className="w-full" loading={loading}>
          Send Email <ArrowRight size={16} />
        </Button>
      </form>
    </Form>
  );
}
