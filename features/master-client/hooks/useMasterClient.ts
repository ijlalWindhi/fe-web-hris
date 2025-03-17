import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListMasterClient,
  createMasterClient,
  updateMasterClient,
  deleteMasterClient,
  getDetailMasterClient,
} from "@/services/master-client";
import { TSearchParams, TPayloadMasterClient } from "@/types";

export function useMasterClientList(params: TSearchParams) {
  return useQuery({
    queryKey: ["masterClientList", params],
    queryFn: () => getListMasterClient(params),
  });
}

export function useCreateMasterClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadMasterClient) => createMasterClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterClientList"] });
    },
  });
}

export function useUpdateMasterClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TPayloadMasterClient }) =>
      updateMasterClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterClientList"] });
    },
  });
}

export function useDeleteMasterClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMasterClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterClientList"] });
    },
  });
}

export function useDetailMasterClient(id: number) {
  return useQuery({
    queryKey: ["masterClientDetail", id],
    queryFn: () => getDetailMasterClient(id),
    enabled: !!id,
  });
}
