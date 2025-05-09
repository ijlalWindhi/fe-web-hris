import axios from "@/lib/axios";
import { IResponse, IResponseLogSystem, TSearchParams } from "@/types";

export async function getListLogSistem(
  params?: TSearchParams,
): Promise<IResponse<IResponseLogSystem[]>> {
  try {
    const response = await axios.get<IResponse<IResponseLogSystem[]>>(
      "/log-activity/list",
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error from service getListLogSistem: ", error);
    throw error;
  }
}
