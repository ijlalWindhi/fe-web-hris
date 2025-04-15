import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListClientBilling,
  IResponseDetailClientBilling,
  IResponseDetailBilling,
  TSearchParams,
  IResponseDownloadBilling,
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
      `/client-billing/list-detail/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailClientBilling: ", error);
    throw error;
  }
}

export async function getDetailBilling(
  id: string,
): Promise<IResponse<IResponseDetailBilling>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailBilling>>(
      `/client-billing/list-detail/action/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailBilling: ", error);
    throw error;
  }
}

export async function verifyBilling(id: string): Promise<IResponse<null>> {
  try {
    const response = await axios.put<IResponse<null>>(
      `/client-billing/verify-billing/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service verifyBilling: ", error);
    throw error;
  }
}

export async function downloadBilling(): Promise<
  IResponse<IResponseDownloadBilling>
> {
  try {
    const response = await axios.get<IResponse<IResponseDownloadBilling>>(
      "/client-billing/download/file",
    );
    return response.data;
  } catch (error) {
    console.error("Error from service downloadBilling: ", error);
    throw error;
  }
}
