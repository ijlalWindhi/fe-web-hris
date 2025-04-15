import {
  getListRoleManagement,
  getDetailRoleManagement,
  getUserRoleManagement,
  getDetailPermission,
  getOptionsModule,
  postPermission,
  updatePermission,
} from "@/services/role-management";
import { TSearchParams, TPayloadPermission } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useRoleList(params: TSearchParams) {
  return useQuery({
    queryKey: ["roleList", params],
    queryFn: () => getListRoleManagement(params),
  });
}

export function useRoleDetail(id: string) {
  return useQuery({
    queryKey: ["roleDetail", id],
    queryFn: () => getDetailRoleManagement(id),
  });
}

export function useUserRole(id: string, params: TSearchParams) {
  return useQuery({
    queryKey: ["userRole", id, params],
    queryFn: () => getUserRoleManagement(id, params),
  });
}

export function usePermissionDetail(id: string) {
  return useQuery({
    queryKey: ["permissionDetail", id],
    queryFn: () => getDetailPermission(id),
  });
}

export function useOptionsModule() {
  return useQuery({
    queryKey: ["optionsModule"],
    queryFn: () => getOptionsModule(),
  });
}

export function usePostPermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TPayloadPermission) => postPermission(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roleList"] });
    },
  });
}

export function useUpdatePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id_role_permission: string) =>
      updatePermission(id_role_permission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissionDetail"] });
    },
  });
}
