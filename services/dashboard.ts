import axios from "@/lib/axios";
import {
  IResponse,
  IResponseDashboard,
  IResponseTad,
  IResponseBilling,
} from "@/types";

export async function getDashboard(
  start?: string,
  end?: string,
): Promise<IResponse<IResponseDashboard[]>> {
  try {
    const response = await axios.get<IResponse<IResponseDashboard[]>>(
      "/dashboard",
      {
        params: { start, end },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDashboard: ", error);
    throw error;
  }
}

export async function getTad(
  start?: string,
  end?: string,
): Promise<IResponse<IResponseTad>> {
  try {
    const response = await axios.get<IResponse<IResponseTad>>(
      "/dashboard/tad",
      {
        params: { start, end },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getTad: ", error);
    throw error;
  }
}

export async function getBilling(
  start?: string,
  end?: string,
): Promise<IResponse<IResponseBilling>> {
  try {
    const response = await axios.get<IResponse<IResponseBilling>>(
      "/dashboard/billing",
      {
        params: { start, end },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getBilling: ", error);
    throw error;
  }
}
