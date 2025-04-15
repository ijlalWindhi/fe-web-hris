import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth";
import { TPayloadLogin } from "@/types";
import { setCookies } from "@/utils/cookie";
import useAuth from "@/stores/auth";

export function useLogin() {
  const { getProfile, getMenu, getPermission } = useAuth();
  return useMutation({
    mutationFn: (data: TPayloadLogin) => login(data),
    onSuccess: async (response) => {
      if (response.status === "success" && response.data) {
        setCookies("token", response.data.token);

        await Promise.all([getProfile(), getMenu(), getPermission()]);
      }
    },
  });
}
