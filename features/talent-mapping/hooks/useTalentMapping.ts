import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListTalentMapping,
  getDetailTalentMapping,
  getViewTalentMapping,
  getHistoryTalentMapping,
  getShiftCalender,
  getTalentOptions,
  createTalentMapping,
  updateTalentMapping,
  deleteTalentMapping,
} from "@/services/talent-mapping";
import {
  TSearchParams,
  TPayloadTalentMapping,
  TParamsShiftCalender,
} from "@/types";

export function useTalentMappingList(params: TSearchParams) {
  return useQuery({
    queryKey: ["talentMappingList", params],
    queryFn: () => getListTalentMapping(params),
  });
}

export function useCreateTalentMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadTalentMapping) => createTalentMapping(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talentMappingList"] });
    },
  });
}

export function useUpdateTalentMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TPayloadTalentMapping }) =>
      updateTalentMapping(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talentMappingList"] });
    },
  });
}

export function useDeleteTalentMapping() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTalentMapping(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talentMappingList"] });
    },
  });
}

export function useDetailTalentMapping(id: string) {
  return useQuery({
    queryKey: ["talentMapping", id],
    queryFn: () => getDetailTalentMapping(id),
    enabled: false,
  });
}

export function useViewTalentMapping(id: string) {
  return useQuery({
    queryKey: ["viewTalentMapping", id],
    queryFn: () => getViewTalentMapping(id),
    enabled: false,
  });
}

export function useHistoryTalentMapping(id: string) {
  return useQuery({
    queryKey: ["historyTalentMapping", id],
    queryFn: () => getHistoryTalentMapping(id),
    enabled: false,
  });
}

export function useShiftCalender(params: TParamsShiftCalender) {
  return useQuery({
    queryKey: ["shiftCalender", params],
    queryFn: () => getShiftCalender(params),
    enabled: false,
  });
}

export function useTalentOptions({
  client_id,
  src,
}: {
  client_id: string;
  src?: string;
}) {
  return useQuery({
    queryKey: ["talentOptions", client_id, src],
    queryFn: () => getTalentOptions({ client_id, src }),
  });
}
