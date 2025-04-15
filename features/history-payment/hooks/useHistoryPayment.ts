import { useQuery } from "@tanstack/react-query";
import {
  getListHistoryPayment,
  getDetailHistoryPayment,
} from "@/services/history-payment";
import { TSearchParams } from "@/types";

export function useHistoryPaymentList(params: TSearchParams) {
  return useQuery({
    queryKey: ["historyPaymentList", params],
    queryFn: () => getListHistoryPayment(params),
  });
}

export function useDetailHistoryPayment(id: string) {
  return useQuery({
    queryKey: ["historyPaymentDetail", id],
    queryFn: () => getDetailHistoryPayment(id),
    enabled: false,
  });
}
