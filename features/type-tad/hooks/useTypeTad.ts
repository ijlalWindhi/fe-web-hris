import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListTypeTad,
  getDetailTypeTad,
  createTypeTad,
  editTypeTad,
  deleteTypeTad,
  getTypeTadOptions,
} from "@/services/type-tad";
import { TPayloadTypeTad, TSearchParams } from "@/types";

export function useTypeTadList(params: TSearchParams) {
  return useQuery({
    queryKey: ["typeTadList", params],
    queryFn: () => getListTypeTad(params),
  });
}

export function useDetailTypeTad(id: number) {
  return useQuery({
    queryKey: ["masterHolidayDetail", id],
    queryFn: () => getDetailTypeTad(id),
    enabled: false,
  });
}

export function useCreateTypeTad() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadTypeTad) => createTypeTad(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typeTadList"] });
    },
  });
}

export function useUpdateTypeTad() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TPayloadTypeTad }) =>
      editTypeTad(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typeTadList"] });
    },
  });
}

export function useDeleteTypeTad() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTypeTad(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typeTadList"] });
    },
  });
}

export function useTypeTadOptions() {
  return useQuery({
    queryKey: ["claimCompensationOptions"],
    queryFn: () => getTypeTadOptions(),
  });
}
