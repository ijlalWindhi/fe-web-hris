import { useQuery } from "@tanstack/react-query";
import {
  getListTalentMonitor,
  getTalentInformation,
  getTalentMapping,
  getContract,
  getAttendance,
  getTimesheet,
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

export function useAttendance(
  id: string,
  start_date?: string,
  end_date?: string,
) {
  return useQuery({
    queryKey: ["attendance", id],
    queryFn: () => getAttendance(id, start_date, end_date),
  });
}

export function useTimesheet(
  id: string,
  start_date?: string,
  end_date?: string,
) {
  return useQuery({
    queryKey: ["timesheet", id],
    queryFn: () => getTimesheet(id, start_date, end_date),
  });
}
