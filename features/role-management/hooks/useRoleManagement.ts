import {
  getListRoleManagement,
  getDetailRoleManagement,
  getUserRoleManagement,
} from "@/services/role-management";
import { TSearchParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

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
