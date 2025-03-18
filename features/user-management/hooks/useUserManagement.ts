import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getListUserManagement,
  createUserManagement,
  updateUserManagement,
  updateStatus,
  deleteUserManagement,
  getDetailUserManagement,
} from "@/services/user-management";
import { TSearchParams, TPayloadUserManagement } from "@/types";

export function useUserList(params: TSearchParams) {
  return useQuery({
    queryKey: ["userList", params],
    queryFn: () => getListUserManagement(params),
  });
}

export function useCreateUserManagement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayloadUserManagement) => createUserManagement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });
}

export function useUpdateUserManagement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TPayloadUserManagement }) =>
      updateUserManagement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });
}

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => updateStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      queryClient.invalidateQueries({ queryKey: ["userRole"] });
    },
  });
}

export function useDeleteUserManagement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserManagement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });
}

export function useDetailUserManagement(id: number) {
  return useQuery({
    queryKey: ["userDetail", id],
    queryFn: () => getDetailUserManagement(id),
    enabled: !!id,
  });
}
