import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getListClientBilling,
  getDetailClientBilling,
  getDetailBilling,
  verifyBilling,
  downloadBilling,
} from "@/services/client-billing";
import { TSearchParams } from "@/types";

export function useClientBillingList(params: TSearchParams) {
  return useQuery({
    queryKey: ["masterClientList", params],
    queryFn: () => getListClientBilling(params),
  });
}

export function useDetailClientBilling(id: string) {
  return useQuery({
    queryKey: ["masterClientList", id],
    queryFn: () => getDetailClientBilling(id),
    enabled: false,
  });
}

export function useDetailBilling(id: string) {
  return useQuery({
    queryKey: ["masterClientList", id],
    queryFn: () => getDetailBilling(id),
    enabled: false,
  });
}

export function useVerifyBilling() {
  return useMutation({
    mutationFn: (id: string) => verifyBilling(id),
  });
}

export function useDownloadBilling() {
  return useMutation({
    mutationFn: () => downloadBilling(),
  });
}
