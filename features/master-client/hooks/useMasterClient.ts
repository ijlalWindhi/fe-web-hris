import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListMasterClient,
  createMasterClient,
  updateMasterClient,
  deleteMasterClient,
  getDetailMasterClient,
  getDetailInformationMasterClient,
  getOptionMasterClient,
  getOptionOutlet,
  uploadSignature,
} from "@/services/master-client";
import {
  TSearchParams,
  TPayloadMasterClient,
  TPayloadSignature,
} from "@/types";

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

export function useDetailMasterClient(id: string) {
  return useQuery({
    queryKey: ["masterClientDetail", id],
    queryFn: () => getDetailMasterClient(id),
    enabled: false,
  });
}

export function useDetailInformationMasterClient(id: string) {
  return useQuery({
    queryKey: ["masterClientDetailInformation", id],
    queryFn: () => getDetailInformationMasterClient(id),
    enabled: false,
  });
}

export function useOptionMasterClient(src?: string) {
  return useQuery({
    queryKey: ["masterClientOption", src],
    queryFn: () => getOptionMasterClient(src),
  });
}

export function useOptionOutlet(client_id?: string) {
  return useQuery({
    queryKey: ["outletOption", client_id],
    queryFn: () => getOptionOutlet(client_id),
    enabled: !!client_id,
  });
}

export function useUploadSignature() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadSignature[]) => uploadSignature(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterClientList"] });
      queryClient.invalidateQueries({
        queryKey: ["masterClientDetailInformation"],
      });
      queryClient.invalidateQueries({
        queryKey: ["masterClientDetail"],
      });
    },
  });
}
