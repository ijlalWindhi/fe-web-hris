import { useQuery } from "@tanstack/react-query";
import {
  getBilling,
  getDashboard,
  getTad,
  getAttendanceSummary,
  getPaymentReminder,
  getNotPresence,
} from "@/services/dashboard";

export function useDashboard(start?: string, end?: string) {
  return useQuery({
    queryKey: ["dashboard", { start, end }],
    queryFn: () => getDashboard(start, end),
    enabled: Boolean(start && end),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBilling(start?: string, end?: string) {
  return useQuery({
    queryKey: ["billing", { start, end }],
    queryFn: () => getBilling(start, end),
    enabled: Boolean(start && end),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTad(start?: string, end?: string) {
  return useQuery({
    queryKey: ["tad", { start, end }],
    queryFn: () => getTad(start, end),
    enabled: Boolean(start && end),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAttendanceSummary(start?: string, end?: string) {
  return useQuery({
    queryKey: ["attendance-summary", { start, end }],
    queryFn: () => getAttendanceSummary(start, end),
  });
}

export function usePaymentReminder() {
  return useQuery({
    queryKey: ["payment-reminder"],
    queryFn: () => getPaymentReminder(),
  });
}

export function useNotPresence() {
  return useQuery({
    queryKey: ["not-presence"],
    queryFn: () => getNotPresence(),
  });
}
