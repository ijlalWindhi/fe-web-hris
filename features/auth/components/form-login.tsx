"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Mail } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/common/input-password";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import { useLogin } from "../hooks/useLogin";
import { LoginSchema } from "../schemas/login.schema";

export default function FormLogin() {
  // variables
  const router = useRouter();
  const login = useLogin();
  const loading = login.isPending;
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const res = await login.mutateAsync(values);
      if (res) {
        setModalSuccess({
          open: true,
          title: "Login Success",
          message: "Welcome back! You're successfully logged in",
          actionVariant: "default",
          actionMessage: "Go to Dashboard",
          action: () => {
            router.push("/");
          },
          animation: "success",
        });
      }
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
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
        <InputField
          name="password"
          label="Password"
          primary
          control={form.control}
          render={({ field }) => (
            <InputPassword placeholder="Enter your password" {...field} />
          )}
        />
        <Link href="/auth/reset-password">
          <p className="text-xs md:text-sm text-primary text-right">
            Forgot Password?
          </p>
        </Link>
        <Button type="submit" className="w-full" loading={loading}>
          Login <ArrowRight size={16} />
        </Button>
      </form>
    </Form>
  );
}
