import axios from "@/lib/axios";
import { IResponsePagination } from "@/types";
import {
  TPayloadLogin,
  TResponseLogin,
  TResponseProfile,
  TResponsePermission,
  TResponseMenu,
} from "@/types/modules/auth";

export async function login(data: TPayloadLogin): Promise<TResponseLogin> {
  try {
    const response = await axios.post<TResponseLogin>("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error from service login: ", error);
    throw error;
  }
}

export async function getProfile(): Promise<TResponseProfile> {
  try {
    const response = await axios.get<TResponseProfile>("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error from getProfile: ", error);
    throw error;
  }
}

export async function getPermissions(): Promise<
  IResponsePagination<TResponsePermission[]>
> {
  try {
    const response =
      await axios.get<IResponsePagination<TResponsePermission[]>>(
        "/auth/permissions",
      );
    return response.data;
  } catch (error) {
    console.error("Error from getPermissions: ", error);
    throw error;
  }
}

export async function getMenu(): Promise<IResponsePagination<TResponseMenu[]>> {
  try {
    const response =
      await axios.get<IResponsePagination<TResponseMenu[]>>("/auth/menu");
    return response.data;
  } catch (error) {
    console.error("Error from getMenu: ", error);
    throw error;
  }
}
