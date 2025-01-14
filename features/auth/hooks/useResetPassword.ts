import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/services/auth";
import { TPayloadResetPassword } from "@/types";

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: TPayloadResetPassword) => resetPassword(data),
  });
}
