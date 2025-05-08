import { useQuery } from "@tanstack/react-query";
import { getListLogSistem } from "@/services/log-system";
import { TSearchParams } from "@/types";

export function useLogSystemList(params: TSearchParams) {
  return useQuery({
    queryKey: ["logSystemList", params],
    queryFn: () => getListLogSistem(params),
  });
}
