import axios from "@/lib/axios";
import {
  IResponse,
  IResponseClaimCompensation,
  IResponseClaimCompensationOptions,
  TPayloadClaimCompensation,
  TSearchParams,
} from "@/types";

export async function getListClaimCompensation(
  params?: TSearchParams,
): Promise<IResponse<IResponseClaimCompensation[]>> {
  try {
    const response = await axios.get<IResponse<IResponseClaimCompensation[]>>(
      "/compensation/list",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListClaimCompensation: ", error);
    throw error;
  }
}

export async function getDetailClaimCompensation(
  id: number,
): Promise<IResponse<IResponseClaimCompensation>> {
  try {
    const response = await axios.get<IResponse<IResponseClaimCompensation>>(
      `/compensation/detail/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailClaimCompensation: ", error);
    throw error;
  }
}

export async function createClaimCompensation(
  data: TPayloadClaimCompensation,
): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>("/compensation", data);
    return response.data;
  } catch (error) {
    console.error("Error from service createClaimCompensation: ", error);
    throw error;
  }
}

export async function editClaimCompensation(
  id: number,
  data: TPayloadClaimCompensation,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/compensation/detail/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service editClaimCompensation: ", error);
    throw error;
  }
}

export async function deleteClaimCompensation(
  id: number,
): Promise<IResponse<null>> {
  try {
    const response = await axios.delete<IResponse<null>>(
      `/compensation/detail/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service deleteClaimCompensation: ", error);
    throw error;
  }
}

export async function getClaimCompensationOptions(): Promise<
  IResponse<IResponseClaimCompensationOptions[]>
> {
  try {
    const response = await axios.get<
      IResponse<IResponseClaimCompensationOptions[]>
    >("/compensation/master/type");
    return response.data;
  } catch (error) {
    console.error("Error from service getClaimCompensationOptions: ", error);
    throw error;
  }
}
