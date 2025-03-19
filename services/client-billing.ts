import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListClientBilling,
  IResponseDetailClientBilling,
  TSearchParams,
} from "@/types";

export async function getListClientBilling(
  params?: TSearchParams,
): Promise<IResponse<IResponseListClientBilling[]>> {
  try {
    const response = await axios.get<IResponse<IResponseListClientBilling[]>>(
      "/client-billing/list",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListClientBilling: ", error);
    throw error;
  }
}

export async function getDetailClientBilling(
  id: string,
): Promise<IResponse<IResponseDetailClientBilling>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailClientBilling>>(
      `/client-billing/list/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailClientBilling: ", error);
    throw error;
  }
}
