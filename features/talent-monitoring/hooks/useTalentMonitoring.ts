import { useQuery } from "@tanstack/react-query";
import {
  getListTalentMonitor,
  getTalentInformation,
  getTalentMapping,
  getContract,
} from "@/services/talent-monitoring";
import { TSearchParams } from "@/types";

export function useTalentMonitoringList(params: TSearchParams) {
  return useQuery({
    queryKey: ["talentMonitoring", params],
    queryFn: () => getListTalentMonitor(params),
  });
}

export function useTalentInformation(id: string) {
  return useQuery({
    queryKey: ["talentInformation", id],
    queryFn: () => getTalentInformation(id),
  });
}

export function useTalentMapping(id: string) {
  return useQuery({
    queryKey: ["talentMapping", id],
    queryFn: () => getTalentMapping(id),
  });
}

export function useContract(id: string) {
  return useQuery({
    queryKey: ["contract", id],
    queryFn: () => getContract(id),
  });
}
