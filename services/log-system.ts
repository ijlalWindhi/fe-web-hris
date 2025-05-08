import axios from "@/lib/axios";
import { IResponse, IResponseLogSistem, TSearchParams } from "@/types";

export async function getListLogSistem(
  params?: TSearchParams,
): Promise<IResponse<IResponseLogSistem[]>> {
  try {
    const response = await axios.get<IResponse<IResponseLogSistem[]>>(
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
