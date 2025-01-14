import { Metadata } from "next";

import { FormLogin } from "@/features/auth";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Login ${METADATA.exTitle}`,
  description: `Login to your account account and start managing your data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/auth/login`,
  },
};

export default function Login() {
  return (
    <div className="space-y-4 w-full p-4">
      <div className="text-center lg:text-left">
        <h1 className="text-xl sm:text-2xl font-semibold">Welcome Back!😉</h1>
        <p className="text-xs sm:text-sm">
          Please enter your email and password to access your account.
        </p>
      </div>

      <FormLogin />
    </div>
  );
}
