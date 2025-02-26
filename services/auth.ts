import axios from "@/lib/axios";
import {
  IResponseMessage,
  IResponsePagination,
  INavItem,
  TPayloadLogin,
  TResponseLogin,
  TPayloadResetPassword,
  TPayloadNewPassword,
  TResponseProfile,
  TResponsePermission,
} from "@/types";

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
    console.error("Error from service getProfile: ", error);
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
    console.error("Error from service getPermissions: ", error);
    throw error;
  }
}

export async function getMenu(): Promise<IResponsePagination<INavItem[]>> {
  try {
    const response =
      await axios.get<IResponsePagination<INavItem[]>>("/auth/menu");
    return response.data;
  } catch (error) {
    console.error("Error from service getMenu: ", error);
    throw error;
  }
}

export async function resetPassword(
  data: TPayloadResetPassword,
): Promise<IResponseMessage> {
  try {
    const response = await axios.post("/auth/forgot-password/send-email", data);
    return response.data;
  } catch (error) {
    console.error("Error from service resetPassword: ", error);
    throw error;
  }
}

export async function newPassword(
  data: TPayloadNewPassword,
): Promise<IResponseMessage> {
  try {
    const response = await axios.post(
      "/auth/forgot-password/change-password",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service newPassword: ", error);
    throw error;
  }
}
