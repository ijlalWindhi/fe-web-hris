import axios from "@/lib/axios";
import {
  IResponse,
  TPayloadUserManagement,
  IResponseUserManagement,
  TSearchParams,
} from "@/types";

export async function getListUserManagement(
  params?: TSearchParams,
): Promise<IResponse<IResponseUserManagement[]>> {
  try {
    const response = await axios.get<IResponse<IResponseUserManagement[]>>(
      "/user/list",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListUserManagement: ", error);
    throw error;
  }
}

export async function createUserManagement(
  data: TPayloadUserManagement,
): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>("/user/add", data);
    return response.data;
  } catch (error) {
    console.error("Error from service createUserManagement: ", error);
    throw error;
  }
}

export async function updateUserManagement(
  id: string,
  data: TPayloadUserManagement,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/user/update/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service updateUserManagement: ", error);
    throw error;
  }
}

export async function deleteUserManagement(
  id: string,
): Promise<IResponse<null>> {
  try {
    const response = await axios.delete<IResponse<null>>(`/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error from service deleteUserManagement: ", error);
    throw error;
  }
}

export async function getDetailUserManagement(
  id: number,
): Promise<IResponse<IResponseUserManagement>> {
  try {
    const response = await axios.get<IResponse<IResponseUserManagement>>(
      `/user/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailUserManagement: ", error);
    throw error;
  }
}
