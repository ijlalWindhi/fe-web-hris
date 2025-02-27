import type { LucideIcon } from "lucide-react";

export interface IThemeStore {
  isLoading: boolean;
  isSidebarOpen: boolean;
  modalSuccess: IModalSuccess;
  modalDelete: IModalDelete;
  setLoading: (loading: boolean) => void;
  setModalSuccess: (modal: IModalSuccess) => void;
  setModalDelete: (modal: IModalDelete) => void;
  toggleSidebar: () => void;
}

export interface IModalDelete {
  open: boolean;
  type: string;
  action?: () => void;
}

interface IModalSuccess {
  open: boolean;
  title: string;
  message: string;
  actionMessage?: string;
  actionVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  animation?: "success" | "email";
  action?: () => void;
}

// Header Dashboard
export interface INavItem {
  id: number;
  title: string;
  path: string;
  icon: LucideIcon | null;
  sub: INavItem[];
}
