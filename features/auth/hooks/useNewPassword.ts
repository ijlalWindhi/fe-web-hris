import { useMutation } from "@tanstack/react-query";

import { newPassword } from "@/services/auth";
import { TPayloadNewPassword } from "@/types";

export function useNewPassword() {
  return useMutation({
    mutationFn: (data: TPayloadNewPassword) => newPassword(data),
  });
}
