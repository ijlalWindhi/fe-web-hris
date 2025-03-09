import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Settings, User } from "lucide-react";

import { getProfile, getPermissions, getMenu } from "@/services/auth";
import {
  INavItem,
  IAuthStore,
  TResponseProfile,
  TResponsePermission,
} from "@/types";

const useAuth = create<IAuthStore>()(
  persist(
    (setState) => ({
      // state
      profile: {} as TResponseProfile,
      permission: [],
      menu: [
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

      // actions
      getProfile: async () => {
        try {
          const profile = await getProfile();
          if (profile) {
            setState((state) => ({
              ...state,
              profile: profile,
            }));
          }
          return profile || {};
        } catch (error) {
          console.error("Error store getProfile:", error);
          throw error;
        }
      },
      getPermission: async () => {
        try {
          const permissions = await getPermissions();
          let flattenedPermissions: TResponsePermission[] = [];
          if (permissions) {
            flattenedPermissions = permissions?.results?.flat() || [];
            setState((state) => ({
              ...state,
              permission: flattenedPermissions || [],
            }));
          }
          return flattenedPermissions || [];
        } catch (error) {
          console.error("Error store getPermission:", error);
          throw error;
        }
      },
      getMenu: async () => {
        try {
          const menus = await getMenu();
          let flattenedMenus: INavItem[] = [];
          if (menus) {
            flattenedMenus = menus?.results?.flat() || [];
            setState((state) => ({
              ...state,
              menu: flattenedMenus || [],
            }));
          }
          return flattenedMenus || [];
        } catch (error) {
          console.error("Error store getMenu:", error);
          throw error;
        }
      },
    }),
    {
      name: `${process.env.NEXT_PUBLIC_STORAGE_NAME}:auth`,
    },
  ),
);

export default useAuth;
