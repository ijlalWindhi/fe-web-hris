import axios from "@/lib/axios";
import {
  IResponse,
  IResponsePagination,
  INavItem,
  TPayloadLogin,
  TResponseLogin,
  TPayloadResetPassword,
  TPayloadNewPassword,
  TResponseProfile,
  TResponsePermission,
  TResponseMenu,
} from "@/types";

export async function login(
  data: TPayloadLogin,
): Promise<IResponse<TResponseLogin>> {
  try {
    const response = await axios.post<IResponse<TResponseLogin>>(
      "/auth/login",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error from service login: ", error);
    throw error;
  }
}

export async function getProfile(): Promise<IResponse<TResponseProfile>> {
  try {
    const response = await axios.get<IResponse<TResponseProfile>>("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error from service getProfile: ", error);
    throw error;
  }
}

export async function getPermissions(): Promise<
  IResponse<TResponsePermission>
> {
  try {
    const response =
      await axios.get<IResponse<TResponsePermission>>("/auth/permissions");
    return response.data;
  } catch (error) {
    console.error("Error from service getPermissions: ", error);
    throw error;
  }
}

export async function getMenu(): Promise<IResponse<TResponseMenu>> {
  try {
    const response = await axios.get<IResponse<TResponseMenu>>("/auth/menu");
    return response.data;
  } catch (error) {
    console.error("Error from service getMenu: ", error);
    throw error;
  }
}

export async function resetPassword(
  data: TPayloadResetPassword,
): Promise<IResponse> {
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
): Promise<IResponse> {
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
