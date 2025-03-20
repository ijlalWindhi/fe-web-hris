import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListTalentMonitoring,
  IResponseTalentInformation,
  TSearchParams,
} from "@/types";

export async function getListTalentMonitor(
  params?: TSearchParams,
): Promise<IResponse<IResponseListTalentMonitoring[]>> {
  try {
    const response = await axios.get<
      IResponse<IResponseListTalentMonitoring[]>
    >("/talent-monitor/list", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error from service getListTalentMonitor: ", error);
    throw error;
  }
}

export async function getTalentInformation(
  id: string,
): Promise<IResponse<IResponseTalentInformation>> {
  try {
    const response = await axios.get<IResponse<IResponseTalentInformation>>(
      `/talent-monitor/information/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getTalentInformation: ", error);
    throw error;
  }
}
