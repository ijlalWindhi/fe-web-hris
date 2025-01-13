import { AxiosError } from "axios";

import axios from "@/lib/axios";
import { ApiResponse } from "@/types";
import { TPayloadLogin, TResponseLogin } from "@/types/auth";

export async function login(
  data: TPayloadLogin,
): Promise<ApiResponse<TResponseLogin>> {
  try {
    const response = await axios.post<ApiResponse<TResponseLogin>>(
      "/auth/login",
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error from service login: ", error);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
