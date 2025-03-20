import { useQuery } from "@tanstack/react-query";
import {
  getListTalentMonitor,
  getTalentInformation,
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
