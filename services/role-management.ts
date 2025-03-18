import axios from "@/lib/axios";
import {
  IResponse,
  IResponseDetailRoleManagement,
  IResponseRoleManagement,
  IResponseUserManagement,
  TSearchParams,
} from "@/types";

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

export async function getDetailRoleManagement(
  id: string,
): Promise<IResponse<IResponseDetailRoleManagement>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailRoleManagement>>(
      `/role/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailRoleManagement: ", error);
    throw error;
  }
}

export async function getUserRoleManagement(
  id: string,
  params?: TSearchParams,
): Promise<IResponse<IResponseUserManagement[]>> {
  try {
    const response = await axios.get<IResponse<IResponseUserManagement[]>>(
      `/role/users/${id}`,
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getUserRoleManagement: ", error);
    throw error;
  }
}
