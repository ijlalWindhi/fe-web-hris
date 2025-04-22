import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListClaimCompensation,
  getDetailClaimCompensation,
  createClaimCompensation,
  editClaimCompensation,
  deleteClaimCompensation,
  getClaimCompensationOptions,
} from "@/services/claim-compensation";
import { TPayloadClaimCompensation, TSearchParams } from "@/types";

export function useClaimCompensationList(params: TSearchParams) {
  return useQuery({
    queryKey: ["claimCompensationList", params],
    queryFn: () => getListClaimCompensation(params),
  });
}

export function useDetailClaimCompensation(id: number) {
  return useQuery({
    queryKey: ["masterHolidayDetail", id],
    queryFn: () => getDetailClaimCompensation(id),
    enabled: false,
  });
}

export function useCreateClaimCompensation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadClaimCompensation) =>
      createClaimCompensation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claimCompensationList"] });
    },
  });
}

export function useUpdateClaimCompensation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: TPayloadClaimCompensation;
    }) => editClaimCompensation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claimCompensationList"] });
    },
  });
}

export function useDeleteClaimCompensation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteClaimCompensation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claimCompensationList"] });
    },
  });
}

export function useClaimCompensationOptions() {
  return useQuery({
    queryKey: ["claimCompensationOptions"],
    queryFn: () => getClaimCompensationOptions(),
  });
}
