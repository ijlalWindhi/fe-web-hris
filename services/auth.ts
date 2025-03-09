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
import { Settings, User } from "lucide-react";

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
    // const response =
    //   await axios.get<IResponsePagination<INavItem[]>>("/auth/menu");
    // return response.data;
    return {
      results: [
        {
          id: 2,
          title: "Dashboard",
          path: "/",
          icon: null,
          sub: [],
        },
        {
          id: 3,
          title: "Talent Mapping",
          path: "/talent-mapping",
          icon: null,
          sub: [],
        },
        {
          id: 5,
          title: "Talent Monitoring",
          path: "/talent-monitoring",
          icon: null,
          sub: [],
        },
        {
          id: 6,
          title: "Client Billing",
          path: "/client-billing",
          icon: null,
          sub: [],
        },
        {
          id: 7,
          title: "Master Client",
          path: "/master-client",
          icon: null,
          sub: [],
        },
        {
          id: 8,
          title: "User Management",
          path: "/user-management",
          icon: null,
          sub: [
            {
              id: 8,
              title: "Role Management",
              path: "/user-management/role-management",
              icon: Settings,
              sub: [],
            },
            {
              id: 9,
              title: "User Management",
              path: "/user-management",
              icon: User,
              sub: [],
            },
          ],
        },
      ],
      page: 1,
      page_size: 10,
      count: 6,
      page_count: 1,
    };
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
