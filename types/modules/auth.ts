import { INavItem } from "./theme";

export interface IAuthStore {
  profile: TResponseProfile;
  permission: TPermission[];
  menu: INavItem[];
  getProfile: () => Promise<TResponseProfile>;
  getPermission: () => Promise<TPermission[]>;
  getMenu: () => Promise<INavItem[]>;
}

// Login
export type TPayloadLogin = {
  email: string;
  password: string;
};

export type TResponseLogin = {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  token: string;
};

// Reset Password
export type TPayloadResetPassword = {
  email: string;
};

// New Password
export type TPayloadNewPassword = {
  token: string;
  password: string;
};

// Profile
export type TResponseProfile = {
  id: string;
  email: string;
  name: string;
  isact: boolean;
  phone: string;
  refreshed_token: string;
  image: string;
  role: {
    id: number;
    name: string;
  };
};

// Permission
export type TPermission = {
  id: number;
  permission: string;
  module: {
    id: number;
    nama: string;
  };
};

export type TResponsePermission = {
  results: TPermission[];
};

// Menu
export type TResponseMenu = {
  results: INavItem[];
};
