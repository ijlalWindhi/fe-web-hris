import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListMasterHoliday,
  getDetailMasterHoliday,
  createMasterHoliday,
  editMasterHoliday,
  deleteMasterHoliday,
} from "@/services/master-data";
import { TPayloadMasterHoliday, TSearchParams } from "@/types";

export function useMasterHolidayList(params: TSearchParams) {
  return useQuery({
    queryKey: ["masterHolidayList", params],
    queryFn: () => getListMasterHoliday(params),
  });
}

export function useDetailMasterHoliday(id: number) {
  return useQuery({
    queryKey: ["masterHolidayDetail", id],
    queryFn: () => getDetailMasterHoliday(id),
    enabled: false,
  });
}

export function useCreateMasterHoliday() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadMasterHoliday) => createMasterHoliday(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterHolidayList"] });
    },
  });
}

export function useUpdateMasterHoliday() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TPayloadMasterHoliday }) =>
      editMasterHoliday(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterHolidayList"] });
    },
  });
}

export function useDeleteMasterHoliday() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMasterHoliday(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterHolidayList"] });
    },
  });
}
