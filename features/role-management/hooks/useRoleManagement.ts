import { getListRoleManagement } from "@/services/role-management";
import { TSearchParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useRoleList(params: TSearchParams) {
  return useQuery({
    queryKey: ["roleList", params],
    queryFn: () => getListRoleManagement(params),
  });
}
