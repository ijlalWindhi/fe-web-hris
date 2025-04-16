import { useQuery } from "@tanstack/react-query";
import { getBilling, getDashboard, getTad } from "@/services/dashboard";

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
