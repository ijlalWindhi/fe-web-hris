import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListMasterHoliday,
  TPayloadMasterHoliday,
  TSearchParams,
} from "@/types";

export async function getListMasterHoliday(
  params?: TSearchParams,
): Promise<IResponse<IResponseListMasterHoliday[]>> {
  try {
    const response = await axios.get<IResponse<IResponseListMasterHoliday[]>>(
      "/holiday",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListMasterHoliday: ", error);
    throw error;
  }
}

export async function getDetailMasterHoliday(
  id: number,
): Promise<IResponse<IResponseListMasterHoliday>> {
  try {
    const response = await axios.get<IResponse<IResponseListMasterHoliday>>(
      `/holiday/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailMasterHoliday: ", error);
    throw error;
  }
}

export async function createMasterHoliday(
  data: TPayloadMasterHoliday,
): Promise<IResponse<null>> {
  try {
    const response = await axios.post<IResponse<null>>("/holiday", data);
    return response.data;
  } catch (error) {
    console.error("Error from service createMasterHoliday: ", error);
    throw error;
  }
}

export async function editMasterHoliday(
  id: number,
  data: TPayloadMasterHoliday,
): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(`/holiday/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error from service editMasterHoliday: ", error);
    throw error;
  }
}

export async function deleteMasterHoliday(
  id: number,
): Promise<IResponse<null>> {
  try {
    const response = await axios.delete<IResponse<null>>(`/holiday/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error from service deleteMasterHoliday: ", error);
    throw error;
  }
}
