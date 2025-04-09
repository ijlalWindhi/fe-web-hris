import { useQuery } from "@tanstack/react-query";
import {
  getListTalentMonitor,
  getTalentInformation,
  getTalentMapping,
  getContract,
  getAttendance,
  getTimesheet,
  getPerformance,
  getPayroll,
} from "@/services/talent-monitoring";
import { IParamsSearch, TSearchParams } from "@/types";

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

export function useAttendance({
  talent_id,
  start_date,
  end_date,
}: IParamsSearch) {
  return useQuery({
    queryKey: ["attendance", talent_id, start_date, end_date],
    queryFn: () =>
      getAttendance({
        talent_id,
        start_date,
        end_date,
      }),
  });
}

export function useTimesheet({
  talent_id,
  start_date,
  end_date,
}: IParamsSearch) {
  return useQuery({
    queryKey: ["timesheet", talent_id, start_date, end_date],
    queryFn: () => getTimesheet({ talent_id, start_date, end_date }),
  });
}

export function usePerformance(id: string) {
  return useQuery({
    queryKey: ["performance", id],
    queryFn: () => getPerformance(id),
  });
}

export function usePayroll(id: string) {
  return useQuery({
    queryKey: ["payroll", id],
    queryFn: () => getPayroll(id),
  });
}
