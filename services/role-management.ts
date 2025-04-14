import axios from "@/lib/axios";
import {
  IResponse,
  IResponseDetailRoleManagement,
  IResponseRoleManagement,
  IResponseUserManagement,
  IResponseDetailPermission,
  IResponseOptionsModule,
  TPayloadPermission,
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

export async function getDetailPermission(
  id: string,
): Promise<IResponse<IResponseDetailPermission[]>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailPermission[]>>(
      `/permission/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailPermission: ", error);
    throw error;
  }
}

export async function getOptionsModule(): Promise<
  IResponse<IResponseOptionsModule[]>
> {
  try {
    const response =
      await axios.get<IResponse<IResponseOptionsModule[]>>("/module");
    return response.data;
  } catch (error) {
    console.error("Error from service getOptionsModule: ", error);
    throw error;
  }
}

export async function postPermission(
  payload: TPayloadPermission,
): Promise<IResponse> {
  try {
    const response = await axios.post<IResponse>("/permission", payload);
    return response.data;
  } catch (error) {
    console.error("Error from service postPermission: ", error);
    throw error;
  }
}

export async function updatePermission(
  id_role_permission: string,
): Promise<IResponse> {
  try {
    const response = await axios.put<IResponse>(
      `/permission/${id_role_permission}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service updatePermission: ", error);
    throw error;
  }
}
