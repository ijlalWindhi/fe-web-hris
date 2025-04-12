import axios from "@/lib/axios";
import {
  IResponse,
  IResponseListHistoryPayment,
  IResponseDetailHistoryPayment,
  TSearchParams,
} from "@/types";

export async function getListHistoryPayment(
  params?: TSearchParams,
): Promise<IResponse<IResponseListHistoryPayment[]>> {
  try {
    const response = await axios.get<IResponse<IResponseListHistoryPayment[]>>(
      "/history-payment",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListHistoryPayment: ", error);
    throw error;
  }
}

export async function getDetailHistoryPayment(
  id: string,
): Promise<IResponse<IResponseDetailHistoryPayment>> {
  try {
    const response = await axios.get<IResponse<IResponseDetailHistoryPayment>>(
      `/history-payment/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getDetailHistoryPayment: ", error);
    throw error;
  }
}
