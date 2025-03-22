import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListTalentMapping,
  getDetailTalentMapping,
  createTalentMapping,
  updateTalentMapping,
} from "@/services/talent-mapping";
import { TSearchParams, TPayloadTalentMapping } from "@/types";

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

export function useDetailTalentMapping(id: string) {
  return useQuery({
    queryKey: ["talentMapping", id],
    queryFn: () => getDetailTalentMapping(id),
    enabled: false,
  });
}
