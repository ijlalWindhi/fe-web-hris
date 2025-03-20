import axios from "@/lib/axios";
import {
  IResponse,
  TPayloadTalentMapping,
  IResponseListTalentMapping,
  IResponseDetailTalentMapping,
  TSearchParams,
} from "@/types";

export async function getListTalentMapping(
  params?: TSearchParams,
): Promise<IResponse<IResponseListTalentMapping[]>> {
  try {
    const response = await axios.get<IResponse<IResponseListTalentMapping[]>>(
      "/talent-mapping/list",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListTalentMapping: ", error);
    throw error;
  }
}

export async function createTalentMapping(
  data: TPayloadTalentMapping,
): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>("/talent-mapping", data);
    return response.data;
  } catch (error) {
    console.error("Error from service createTalentMapping: ", error);
    throw error;
  }
}

export async function updateTalentMapping(
  id: string,
  data: TPayloadTalentMapping,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/talent-mapping/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service updateTalentMapping: ", error);
    throw error;
  }
}

export async function getDetailTalentMapping(
  id: string,
): Promise<IResponse<IResponseDetailTalentMapping>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailTalentMapping>>(
      `/talent-mapping/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailTalentMapping: ", error);
    throw error;
  }
}
