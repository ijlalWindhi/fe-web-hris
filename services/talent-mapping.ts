import axios from "@/lib/axios";
import {
  IResponse,
  TPayloadTalentMapping,
  IResponseListTalentMapping,
  IResponseDetailTalentMapping,
  IResponseViewTalentMapping,
  IResponseHistoryTalentMapping,
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

export async function deleteTalentMapping(
  id: string,
): Promise<IResponse<null>> {
  try {
    const response = await axios.delete<IResponse<null>>(
      `/talent-mapping/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service deleteTalentMapping: ", error);
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

export async function getViewTalentMapping(
  id: string,
): Promise<IResponse<IResponseViewTalentMapping>> {
  try {
    const response = await axios.get<IResponse<IResponseViewTalentMapping>>(
      `/talent-mapping/view/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getViewTalentMapping: ", error);
    throw error;
  }
}

export async function getHistoryTalentMapping(
  id: string,
): Promise<IResponse<IResponseHistoryTalentMapping[]>> {
  try {
    const response = await axios.get<
      IResponse<IResponseHistoryTalentMapping[]>
    >(`/talent-mapping/history/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error from service getHistoryTalentMapping: ", error);
    throw error;
  }
}
