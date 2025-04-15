import { useMutation } from "@tanstack/react-query";

import { firstLogin } from "@/services/auth";
import { TPayloadFirstLogin } from "@/types";

export function useFirstLogin() {
  return useMutation({
    mutationFn: (data: TPayloadFirstLogin) => firstLogin(data),
  });
}
