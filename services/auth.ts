import axios from "@/lib/axios";
import { IApiResponse, IResponsePagination } from "@/types";
import {
  TPayloadLogin,
  TResponseLogin,
  TResponseProfile,
  TResponsePermission,
  TResponseMenu,
} from "@/types/modules/auth";

export async function login(
  data: TPayloadLogin,
): Promise<IApiResponse<TResponseLogin>> {
  try {
    const response = await axios.post<IApiResponse<TResponseLogin>>(
      "/auth/login",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service login: ", error);
    throw error;
  }
}

export async function getProfile(): Promise<IApiResponse<TResponseProfile>> {
  try {
    const response =
      await axios.get<IApiResponse<TResponseProfile>>("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error from getProfile: ", error);
    throw error;
  }
}

export async function getPermissions(): Promise<
  IApiResponse<IResponsePagination<TResponsePermission[]>>
> {
  try {
    const response =
      await axios.get<IApiResponse<IResponsePagination<TResponsePermission[]>>>(
        "/auth/permissions",
      );
    return response.data;
  } catch (error) {
    console.error("Error from getPermissions: ", error);
    throw error;
  }
}

export async function getMenu(): Promise<
  IApiResponse<IResponsePagination<TResponseMenu[]>>
> {
  try {
    const response =
      await axios.get<IApiResponse<IResponsePagination<TResponseMenu[]>>>(
        "/auth/menu",
      );
    return response.data;
  } catch (error) {
    console.error("Error from getMenu: ", error);
    throw error;
  }
}
