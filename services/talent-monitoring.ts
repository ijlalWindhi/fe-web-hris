import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListTalentMonitoring,
  IResponseTalentInformation,
  IResponseTalentMapping,
  IResponseContract,
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

export async function getTalentMapping(
  id: string,
): Promise<IResponse<IResponseTalentMapping>> {
  try {
    const response = await axios.get<IResponse<IResponseTalentMapping>>(
      `/talent-monitor/talent-mapping/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getTalentMapping: ", error);
    throw error;
  }
}

export async function getContract(
  id: string,
): Promise<IResponse<IResponseContract>> {
  try {
    const response = await axios.get<IResponse<IResponseContract>>(
      `/talent-monitor/contract/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getContract: ", error);
    throw error;
  }
}
