import axios from "@/lib/axios";
import { IResponse, IResponseRoleManagement, TSearchParams } from "@/types";

export async function getListRoleManagement(
  params?: TSearchParams,
): Promise<IResponse<IResponseRoleManagement[]>> {
  try {
    const response = await axios.get<IResponse<IResponseRoleManagement[]>>(
      "/role",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListRoleManagement: ", error);
    throw error;
  }
}
