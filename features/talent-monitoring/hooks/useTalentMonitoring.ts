import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getListTalentMonitor,
  getTalentInformation,
  getTalentMapping,
  getContract,
  getAttendance,
  approveLeave,
  rejectLeave,
  getTimesheet,
  getPerformance,
  getPayroll,
  updatePerformance,
  resetDevice,
} from "@/services/talent-monitoring";
import {
  IParamsSearch,
  TPayloadUpdatePerformance,
  TSearchParams,
} from "@/types";

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

export function useApproveLeave() {
  return useMutation({
    mutationFn: (id: string) => approveLeave(id),
  });
}

export function useRejectLeave() {
  return useMutation({
    mutationFn: (id: string) => rejectLeave(id),
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

export function useUpdatePerformance() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: TPayloadUpdatePerformance;
    }) => updatePerformance(id, data),
  });
}

export function useResetDevice() {
  return useMutation({
    mutationFn: (id: string) => resetDevice(id),
  });
}
