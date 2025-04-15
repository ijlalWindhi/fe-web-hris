import { Metadata } from "next";

import { FormFirstLogin } from "@/features/auth";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `First Login ${METADATA.exTitle}`,
  description: `Setup your new password and get back to your account`,
  alternates: {
    canonical: `${process.env.DOMAIN}/auth/first-login`,
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

      <FormFirstLogin />
    </div>
  );
}
