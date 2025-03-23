import { useQuery } from "@tanstack/react-query";
import {
  getListClientBilling,
  getDetailClientBilling,
  getDetailBilling,
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
