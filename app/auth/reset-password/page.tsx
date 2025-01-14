import { Metadata } from "next";

import { FormResetPassword } from "@/features/auth";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Reset Password ${METADATA.exTitle}`,
  description: `Reset your password and get back to your account`,
  alternates: {
    canonical: `${process.env.DOMAIN}/auth/reset-password`,
  },
};

export default function Login() {
  return (
    <div className="space-y-4 w-full p-4">
      <div className="text-center lg:text-left">
        <h1 className="text-xl sm:text-2xl font-semibold">Reset Password</h1>
        <p className="text-xs sm:text-sm">
          Enter the registered email to receive the password reset link.
        </p>
      </div>

      <FormResetPassword />
    </div>
  );
}
