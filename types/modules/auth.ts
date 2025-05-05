import { INavItem } from "./theme";

export interface IAuthStore {
  profile: TResponseProfile;
  permission: TPermission[];
  menu: INavItem[];
  getProfile: () => Promise<TResponseProfile>;
  getPermission: () => Promise<TPermission[]>;
  getMenu: () => Promise<INavItem[]>;
  logout: () => void;
}

// Login
export type TPayloadLogin = {
  email: string;
  password: string;
};

export type TResponseLogin = {
  id: string;
  email: string;
  name: string;
  isact: boolean;
  role: {
    nama: string;
    id: number;
  };
  token: string;
  token_face_id: string | null;
  change_password: boolean;
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

// First Login
export type TPayloadFirstLogin = {
  email: string;
  password: string;
  confirm_password: string;
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
  client: {
    id: number;
    name: string;
  };
  outlet: {
    id: number;
    name: string;
  };
  address: string;
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
