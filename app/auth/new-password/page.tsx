import { Metadata } from "next";

import { FormNewPassword } from "@/features/auth";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `New Password ${METADATA.exTitle}`,
  description: `Setup new password for your account`,
  alternates: {
    canonical: `${process.env.DOMAIN}/auth/new-password`,
  },
};

export default function NewPassword() {
  return (
    <div className="space-y-4 w-full p-4">
      <div className="text-center lg:text-left">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Setup New Password
        </h1>
        <p className="text-xs sm:text-sm">
          Enter your new password and make sure it complies with our security
          requirements.
        </p>
      </div>

      <FormNewPassword />
    </div>
  );
}
