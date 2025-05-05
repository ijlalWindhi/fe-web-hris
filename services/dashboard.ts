import axios from "@/lib/axios";
import {
  IResponse,
  IResponseDashboard,
  IResponseTad,
  IResponseBilling,
  IResponsePaymentReminder,
  IResponseAttendanceSummary,
  IResponseNotPresence,
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

export async function getAttendanceSummary(
  start?: string,
  end?: string,
): Promise<IResponse<IResponseAttendanceSummary[]>> {
  try {
    const response = await axios.get<IResponse<IResponseAttendanceSummary[]>>(
      "/dashboard/attendance-sum",
      {
        params: { start, end },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getAttendanceSummary: ", error);
    throw error;
  }
}

export async function getPaymentReminder(): Promise<
  IResponse<IResponsePaymentReminder[]>
> {
  try {
    const response = await axios.get<IResponse<IResponsePaymentReminder[]>>(
      "/dashboard/payment-reminder",
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getPaymentReminder: ", error);
    throw error;
  }
}

export async function getNotPresence(): Promise<
  IResponse<IResponseNotPresence[]>
> {
  try {
    const response = await axios.get<IResponse<IResponseNotPresence[]>>(
      "/dashboard/not-presence",
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getNotPresence: ", error);
    throw error;
  }
}
